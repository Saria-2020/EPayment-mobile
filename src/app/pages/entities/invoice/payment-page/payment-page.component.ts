import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Customer } from '../../customer';
import { PaymentInfo, PaymentInfoService } from '../../payment-info';
import { TransactionService } from '../../transaction';
import { Invoice } from '../invoice.model';
import { TransactionDOT } from './transactionDTO';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  isReadyToSave: boolean;
  isSaving: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentInfoService: PaymentInfoService,
    protected navController: NavController,
    protected toastCtrl: ToastController,

    private fb: FormBuilder,
    private transactionService: TransactionService
  ) { }
  invoice: Invoice;
  paymentInfos: PaymentInfo[] = [];

  form = this.fb.group({
    paymentInfo: ['', Validators.required],
  })
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.invoice = response.data;
    });
    this.loadPaymentInfo()
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  loadPaymentInfo() {
    const customer: Customer = JSON.parse(localStorage.getItem('customer'))

    this.paymentInfoService.query({ "customerId.equals": customer.id }).subscribe(res => {
      this.paymentInfos = res.body
      console.log(res.body);

    })
  }
  save() {
    const paymentInfo: PaymentInfo = this.form.value.paymentInfo
    let data: TransactionDOT = new TransactionDOT(paymentInfo, this.invoice);

    this.transactionService.makePayment(data).subscribe(res => {
      console.log(res);

      this.onSaveSuccess(res)
    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.onError(err);

    })

  }

  async onError(err: HttpErrorResponse) {
    this.isSaving = false;
    const toast = await this.toastCtrl.create({ message: err.error.title, duration: 5000, position: 'middle' });
    toast.present();

  }
  async onSaveSuccess(response) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({ message: `Invoice have  paid  successfully.`, duration: 5000, position: 'middle' });
    toast.present();
    this.navController.navigateBack('/tabs/entities/transaction/' + response.id + '/history');
  }
  comparePaymentInfo(first: PaymentInfo, second: PaymentInfo): boolean {
    return first && first.id && second && second.id ? first.id === second.id : first === second;
  }
  trackPaymentInfoById(index: number, item: PaymentInfo) {
    return item.id;
  }
}

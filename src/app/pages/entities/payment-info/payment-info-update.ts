import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PaymentInfo } from './payment-info.model';
import { PaymentInfoService } from './payment-info.service';
import { Customer, CustomerService } from '../customer';

@Component({
  selector: 'page-payment-info-update',
  templateUrl: 'payment-info-update.html',
})
export class PaymentInfoUpdatePage implements OnInit {
  paymentInfo: PaymentInfo;
  customers: Customer[];
  isSaving = false;
  isNew = true;
  isReadyToSave: boolean;

  form = this.formBuilder.group({
    id: [],
    name: [null, []],
    accountNumber: [null, []],
    cardNumber: [null, []],
    balance: []
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected navController: NavController,
    protected formBuilder: FormBuilder,
    public platform: Platform,
    protected toastCtrl: ToastController,
    private customerService: CustomerService,
    private paymentInfoService: PaymentInfoService
  ) {
    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ngOnInit() {
    const customer: Customer = JSON.parse(localStorage.getItem('customer'))

    this.customerService.query({ "customerId.equals": customer.id }).subscribe(
      (data) => {
        this.customers = data.body;
      },
      (error) => this.onError(error)
    );
    this.activatedRoute.data.subscribe((response) => {
      this.paymentInfo = response.data;
      this.isNew = this.paymentInfo.id === null || this.paymentInfo.id === undefined;
      this.updateForm(this.paymentInfo);
    });
  }

  updateForm(paymentInfo: PaymentInfo) {
    const customer: Customer = JSON.parse(localStorage.getItem('customer'))

    this.form.patchValue({
      id: paymentInfo.id,
      name: paymentInfo.name,
      accountNumber: paymentInfo.accountNumber,
      cardNumber: paymentInfo.cardNumber,
      customer: customer,
      balance: paymentInfo.balance
    });
  }

  save() {
    this.isSaving = true;
    const paymentInfo = this.createFromForm();
    if (!this.isNew) {
      this.subscribeToSaveResponse(this.paymentInfoService.update(paymentInfo));
    } else {
      this.subscribeToSaveResponse(this.paymentInfoService.create(paymentInfo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<PaymentInfo>>) {
    result.subscribe(
      (res: HttpResponse<PaymentInfo>) => this.onSaveSuccess(res),
      (res: HttpErrorResponse) => this.onError(res.error)
    );
  }

  async onSaveSuccess(response) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({ message: `PaymentInfo ${action} successfully.`, duration: 2000, position: 'middle' });
    toast.present();
    this.navController.navigateBack('/tabs/entities/payment-info');
  }

  previousState() {
    window.history.back();
  }

  async onError(error) {
    this.isSaving = false;
    console.error(error);
    const toast = await this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
    toast.present();
  }

  private createFromForm(): PaymentInfo {
    const customer: Customer = JSON.parse(localStorage.getItem('customer'))

    return {
      ...new PaymentInfo(),
      id: this.form.get(['id']).value,
      name: this.form.get(['name']).value,
      accountNumber: this.form.get(['accountNumber']).value,
      cardNumber: this.form.get(['cardNumber']).value,
      balance: this.form.get(['balance']).value,
      customer: customer
    };
  }

  compareCustomer(first: Customer, second: Customer): boolean {
    return first && first.id && second && second.id ? first.id === second.id : first === second;
  }

  trackCustomerById(index: number, item: Customer) {
    return item.id;
  }
}

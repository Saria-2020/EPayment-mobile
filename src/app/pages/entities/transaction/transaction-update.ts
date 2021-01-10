import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Transaction } from './transaction.model';
import { TransactionService } from './transaction.service';
import { Invoice, InvoiceService } from '../invoice';
import { PaymentInfo, PaymentInfoService } from '../payment-info';

@Component({
  selector: 'page-transaction-update',
  templateUrl: 'transaction-update.html',
})
export class TransactionUpdatePage implements OnInit {
  transaction: Transaction;
  invoices: Invoice[];
  paymentInfos: PaymentInfo[];
  dateTime: string;
  isSaving = false;
  isNew = true;
  isReadyToSave: boolean;

  form = this.formBuilder.group({
    id: [],
    name: [null, []],
    uuid: [null, []],
    amount: [null, []],
    dateTime: [null, []],
    paymentDetails: [null, []],
    paymentInfo: [null, []],
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected navController: NavController,
    protected formBuilder: FormBuilder,
    public platform: Platform,
    protected toastCtrl: ToastController,
    private invoiceService: InvoiceService,
    private paymentInfoService: PaymentInfoService,
    private transactionService: TransactionService
  ) {
    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ngOnInit() {
    this.invoiceService.query().subscribe(
      (data) => {
        this.invoices = data.body;
      },
      (error) => this.onError(error)
    );
    this.paymentInfoService.query().subscribe(
      (data) => {
        this.paymentInfos = data.body;
      },
      (error) => this.onError(error)
    );
    this.activatedRoute.data.subscribe((response) => {
      this.transaction = response.data;
      this.isNew = this.transaction.id === null || this.transaction.id === undefined;
      this.updateForm(this.transaction);
    });
  }

  updateForm(transaction: Transaction) {
    this.form.patchValue({
      id: transaction.id,
      name: transaction.name,
      uuid: transaction.uuid,
      amount: transaction.amount,
      dateTime: this.isNew ? new Date().toISOString() : transaction.dateTime,
      paymentDetails: transaction.paymentDetails,
      paymentInfo: transaction.paymentInfo,
    });
  }

  save() {
    this.isSaving = true;
    const transaction = this.createFromForm();
    if (!this.isNew) {
      this.subscribeToSaveResponse(this.transactionService.update(transaction));
    } else {
      this.subscribeToSaveResponse(this.transactionService.create(transaction));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<Transaction>>) {
    result.subscribe(
      (res: HttpResponse<Transaction>) => this.onSaveSuccess(res),
      (res: HttpErrorResponse) => this.onError(res.error)
    );
  }

  async onSaveSuccess(response) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({ message: `Transaction ${action} successfully.`, duration: 2000, position: 'middle' });
    toast.present();
    this.navController.navigateBack('/tabs/entities/transaction');
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

  private createFromForm(): Transaction {
    return {
      ...new Transaction(),
      id: this.form.get(['id']).value,
      name: this.form.get(['name']).value,
      uuid: this.form.get(['uuid']).value,
      amount: this.form.get(['amount']).value,
      dateTime: new Date(this.form.get(['dateTime']).value),
      paymentDetails: this.form.get(['paymentDetails']).value,
      paymentInfo: this.form.get(['paymentInfo']).value,
    };
  }

  compareInvoice(first: Invoice, second: Invoice): boolean {
    return first && first.id && second && second.id ? first.id === second.id : first === second;
  }

  trackInvoiceById(index: number, item: Invoice) {
    return item.id;
  }
  comparePaymentInfo(first: PaymentInfo, second: PaymentInfo): boolean {
    return first && first.id && second && second.id ? first.id === second.id : first === second;
  }

  trackPaymentInfoById(index: number, item: PaymentInfo) {
    return item.id;
  }
}

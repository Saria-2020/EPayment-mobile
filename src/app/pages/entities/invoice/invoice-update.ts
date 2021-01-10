import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Invoice } from './invoice.model';
import { InvoiceService } from './invoice.service';
import { Transaction, TransactionService } from '../transaction';
import { Customer, CustomerService } from '../customer';

@Component({
  selector: 'page-invoice-update',
  templateUrl: 'invoice-update.html',
})
export class InvoiceUpdatePage implements OnInit {
  invoice: Invoice;
  transactions: Transaction[];
  customers: Customer[];
  date: string;
  isSaving = false;
  isNew = true;
  isReadyToSave: boolean;

  form = this.formBuilder.group({
    id: [],
    invoiceNumber: [null, []],
    date: [null, []],
    verificationNumber: [null, []],
    unitName: [null, []],
    totalAmount: [null, []],
    amountPaid: [null, []],
    paid: ['false', []],
    transaction: [null, []],
    customer: [null, []],
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected navController: NavController,
    protected formBuilder: FormBuilder,
    public platform: Platform,
    protected toastCtrl: ToastController,
    private transactionService: TransactionService,
    private customerService: CustomerService,
    private invoiceService: InvoiceService
  ) {
    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ngOnInit() {
    this.transactionService.query({ filter: 'invoice-is-null' }).subscribe(
      (data) => {
        if (!this.invoice.transaction || !this.invoice.transaction.id) {
          this.transactions = data.body;
        } else {
          this.transactionService.find(this.invoice.transaction.id).subscribe(
            (subData: HttpResponse<Transaction>) => {
              this.transactions = [subData.body].concat(subData.body);
            },
            (error) => this.onError(error)
          );
        }
      },
      (error) => this.onError(error)
    );
    this.customerService.query().subscribe(
      (data) => {
        this.customers = data.body;
      },
      (error) => this.onError(error)
    );
    this.activatedRoute.data.subscribe((response) => {
      this.invoice = response.data;
      this.isNew = this.invoice.id === null || this.invoice.id === undefined;
      this.updateForm(this.invoice);
    });
  }

  updateForm(invoice: Invoice) {
    this.form.patchValue({
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      date: this.isNew ? new Date().toISOString() : invoice.date,
      verificationNumber: invoice.verificationNumber,
      unitName: invoice.unitName,
      totalAmount: invoice.totalAmount,
      amountPaid: invoice.amountPaid,
      paid: invoice.paid,
      transaction: invoice.transaction,
      customer: invoice.customer,
    });
  }

  save() {
    this.isSaving = true;
    const invoice = this.createFromForm();
    if (!this.isNew) {
      this.subscribeToSaveResponse(this.invoiceService.update(invoice));
    } else {
      this.subscribeToSaveResponse(this.invoiceService.create(invoice));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<Invoice>>) {
    result.subscribe(
      (res: HttpResponse<Invoice>) => this.onSaveSuccess(res),
      (res: HttpErrorResponse) => this.onError(res.error)
    );
  }

  async onSaveSuccess(response) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({ message: `Invoice ${action} successfully.`, duration: 2000, position: 'middle' });
    toast.present();
    this.navController.navigateBack('/tabs/entities/invoice');
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

  private createFromForm(): Invoice {
    return {
      ...new Invoice(),
      id: this.form.get(['id']).value,
      invoiceNumber: this.form.get(['invoiceNumber']).value,
      date: new Date(this.form.get(['date']).value),
      verificationNumber: this.form.get(['verificationNumber']).value,
      unitName: this.form.get(['unitName']).value,
      totalAmount: this.form.get(['totalAmount']).value,
      amountPaid: this.form.get(['amountPaid']).value,
      paid: this.form.get(['paid']).value,
      transaction: this.form.get(['transaction']).value,
      customer: this.form.get(['customer']).value,
    };
  }

  compareTransaction(first: Transaction, second: Transaction): boolean {
    return first && first.id && second && second.id ? first.id === second.id : first === second;
  }

  trackTransactionById(index: number, item: Transaction) {
    return item.id;
  }
  compareCustomer(first: Customer, second: Customer): boolean {
    return first && first.id && second && second.id ? first.id === second.id : first === second;
  }

  trackCustomerById(index: number, item: Customer) {
    return item.id;
  }
}

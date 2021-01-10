import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { InvoiceItem } from './invoice-item.model';
import { InvoiceItemService } from './invoice-item.service';
import { Invoice, InvoiceService } from '../invoice';

@Component({
  selector: 'page-invoice-item-update',
  templateUrl: 'invoice-item-update.html',
})
export class InvoiceItemUpdatePage implements OnInit {
  invoiceItem: InvoiceItem;
  invoices: Invoice[];
  isSaving = false;
  isNew = true;
  isReadyToSave: boolean;

  form = this.formBuilder.group({
    id: [],
    name: [null, []],
    amount: [null, []],
    invoice: [null, []],
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected navController: NavController,
    protected formBuilder: FormBuilder,
    public platform: Platform,
    protected toastCtrl: ToastController,
    private invoiceService: InvoiceService,
    private invoiceItemService: InvoiceItemService
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
    this.activatedRoute.data.subscribe((response) => {
      this.invoiceItem = response.data;
      this.isNew = this.invoiceItem.id === null || this.invoiceItem.id === undefined;
      this.updateForm(this.invoiceItem);
    });
  }

  updateForm(invoiceItem: InvoiceItem) {
    this.form.patchValue({
      id: invoiceItem.id,
      name: invoiceItem.name,
      amount: invoiceItem.amount,
      invoice: invoiceItem.invoice,
    });
  }

  save() {
    this.isSaving = true;
    const invoiceItem = this.createFromForm();
    if (!this.isNew) {
      this.subscribeToSaveResponse(this.invoiceItemService.update(invoiceItem));
    } else {
      this.subscribeToSaveResponse(this.invoiceItemService.create(invoiceItem));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<InvoiceItem>>) {
    result.subscribe(
      (res: HttpResponse<InvoiceItem>) => this.onSaveSuccess(res),
      (res: HttpErrorResponse) => this.onError(res.error)
    );
  }

  async onSaveSuccess(response) {
    let action = 'updated';
    if (response.status === 201) {
      action = 'created';
    }
    this.isSaving = false;
    const toast = await this.toastCtrl.create({ message: `InvoiceItem ${action} successfully.`, duration: 2000, position: 'middle' });
    toast.present();
    this.navController.navigateBack('/tabs/entities/invoice-item');
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

  private createFromForm(): InvoiceItem {
    return {
      ...new InvoiceItem(),
      id: this.form.get(['id']).value,
      name: this.form.get(['name']).value,
      amount: this.form.get(['amount']).value,
      invoice: this.form.get(['invoice']).value,
    };
  }

  compareInvoice(first: Invoice, second: Invoice): boolean {
    return first && first.id && second && second.id ? first.id === second.id : first === second;
  }

  trackInvoiceById(index: number, item: Invoice) {
    return item.id;
  }
}

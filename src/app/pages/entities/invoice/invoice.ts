import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Invoice } from './invoice.model';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage {
  invoices: Invoice[];

  // todo: add pagination

  constructor(
    private navController: NavController,
    private invoiceService: InvoiceService,
    private toastCtrl: ToastController,
    public plt: Platform
  ) {
    this.invoices = [];
  }

  ionViewWillEnter() {
    this.loadAll();
  }

  async loadAll(refresher?) {
    this.invoiceService
      .query()
      .pipe(
        filter((res: HttpResponse<Invoice[]>) => res.ok),
        map((res: HttpResponse<Invoice[]>) => res.body)
      )
      .subscribe(
        (response: Invoice[]) => {
          this.invoices = response;
          if (typeof refresher !== 'undefined') {
            setTimeout(() => {
              refresher.target.complete();
            }, 750);
          }
        },
        async (error) => {
          console.error(error);
          const toast = await this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
          toast.present();
        }
      );
  }

  trackId(index: number, item: Invoice) {
    return item.id;
  }

  new() {
    this.navController.navigateForward('/tabs/entities/invoice/new');
  }

  edit(item: IonItemSliding, invoice: Invoice) {
    this.navController.navigateForward('/tabs/entities/invoice/' + invoice.id + '/edit');
    item.close();
  }

  async delete(invoice) {
    this.invoiceService.delete(invoice.id).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({ message: 'Invoice deleted successfully.', duration: 3000, position: 'middle' });
        toast.present();
        this.loadAll();
      },
      (error) => console.error(error)
    );
  }

  view(invoice: Invoice) {
    this.navController.navigateForward('/tabs/entities/invoice/' + invoice.id + '/view');
  }
}

import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { InvoiceItem } from './invoice-item.model';
import { InvoiceItemService } from './invoice-item.service';

@Component({
  selector: 'page-invoice-item',
  templateUrl: 'invoice-item.html',
})
export class InvoiceItemPage {
  invoiceItems: InvoiceItem[];

  // todo: add pagination

  constructor(
    private navController: NavController,
    private invoiceItemService: InvoiceItemService,
    private toastCtrl: ToastController,
    public plt: Platform
  ) {
    this.invoiceItems = [];
  }

  ionViewWillEnter() {
    this.loadAll();
  }

  async loadAll(refresher?) {
    this.invoiceItemService
      .query()
      .pipe(
        filter((res: HttpResponse<InvoiceItem[]>) => res.ok),
        map((res: HttpResponse<InvoiceItem[]>) => res.body)
      )
      .subscribe(
        (response: InvoiceItem[]) => {
          this.invoiceItems = response;
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

  trackId(index: number, item: InvoiceItem) {
    return item.id;
  }

  new() {
    this.navController.navigateForward('/tabs/entities/invoice-item/new');
  }

  edit(item: IonItemSliding, invoiceItem: InvoiceItem) {
    this.navController.navigateForward('/tabs/entities/invoice-item/' + invoiceItem.id + '/edit');
    item.close();
  }

  async delete(invoiceItem) {
    this.invoiceItemService.delete(invoiceItem.id).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({ message: 'InvoiceItem deleted successfully.', duration: 3000, position: 'middle' });
        toast.present();
        this.loadAll();
      },
      (error) => console.error(error)
    );
  }

  view(invoiceItem: InvoiceItem) {
    this.navController.navigateForward('/tabs/entities/invoice-item/' + invoiceItem.id + '/view');
  }
}

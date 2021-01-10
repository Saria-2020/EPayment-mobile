import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { PaymentInfo } from './payment-info.model';
import { PaymentInfoService } from './payment-info.service';

@Component({
  selector: 'page-payment-info',
  templateUrl: 'payment-info.html',
})
export class PaymentInfoPage {
  paymentInfos: PaymentInfo[];

  // todo: add pagination

  constructor(
    private navController: NavController,
    private paymentInfoService: PaymentInfoService,
    private toastCtrl: ToastController,
    public plt: Platform
  ) {
    this.paymentInfos = [];
  }

  ionViewWillEnter() {
    this.loadAll();
  }

  async loadAll(refresher?) {
    this.paymentInfoService
      .query()
      .pipe(
        filter((res: HttpResponse<PaymentInfo[]>) => res.ok),
        map((res: HttpResponse<PaymentInfo[]>) => res.body)
      )
      .subscribe(
        (response: PaymentInfo[]) => {
          this.paymentInfos = response;
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

  trackId(index: number, item: PaymentInfo) {
    return item.id;
  }

  new() {
    this.navController.navigateForward('/tabs/entities/payment-info/new');
  }

  edit(item: IonItemSliding, paymentInfo: PaymentInfo) {
    this.navController.navigateForward('/tabs/entities/payment-info/' + paymentInfo.id + '/edit');
    item.close();
  }

  async delete(paymentInfo) {
    this.paymentInfoService.delete(paymentInfo.id).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({ message: 'PaymentInfo deleted successfully.', duration: 3000, position: 'middle' });
        toast.present();
        this.loadAll();
      },
      (error) => console.error(error)
    );
  }

  view(paymentInfo: PaymentInfo) {
    this.navController.navigateForward('/tabs/entities/payment-info/' + paymentInfo.id + '/view');
  }
}

import { Component, OnInit } from '@angular/core';
import { PaymentInfo } from './payment-info.model';
import { PaymentInfoService } from './payment-info.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-payment-info-detail',
  templateUrl: 'payment-info-detail.html',
})
export class PaymentInfoDetailPage implements OnInit {
  paymentInfo: PaymentInfo = {};

  constructor(
    private navController: NavController,
    private paymentInfoService: PaymentInfoService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.paymentInfo = response.data;
    });
  }

  open(item: PaymentInfo) {
    this.navController.navigateForward('/tabs/entities/payment-info/' + item.id + '/edit');
  }

  async deleteModal(item: PaymentInfo) {
    const alert = await this.alertController.create({
      header: 'Confirm the deletion?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Delete',
          handler: () => {
            this.paymentInfoService.delete(item.id).subscribe(() => {
              this.navController.navigateForward('/tabs/entities/payment-info');
            });
          },
        },
      ],
    });
    await alert.present();
  }
}

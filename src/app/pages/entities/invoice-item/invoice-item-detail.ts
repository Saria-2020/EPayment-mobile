import { Component, OnInit } from '@angular/core';
import { InvoiceItem } from './invoice-item.model';
import { InvoiceItemService } from './invoice-item.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-invoice-item-detail',
  templateUrl: 'invoice-item-detail.html',
})
export class InvoiceItemDetailPage implements OnInit {
  invoiceItem: InvoiceItem = {};

  constructor(
    private navController: NavController,
    private invoiceItemService: InvoiceItemService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.invoiceItem = response.data;
    });
  }

  open(item: InvoiceItem) {
    this.navController.navigateForward('/tabs/entities/invoice-item/' + item.id + '/edit');
  }

  async deleteModal(item: InvoiceItem) {
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
            this.invoiceItemService.delete(item.id).subscribe(() => {
              this.navController.navigateForward('/tabs/entities/invoice-item');
            });
          },
        },
      ],
    });
    await alert.present();
  }
}

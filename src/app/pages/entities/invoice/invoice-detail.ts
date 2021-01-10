import { Component, OnInit } from '@angular/core';
import { Invoice } from './invoice.model';
import { InvoiceService } from './invoice.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-invoice-detail',
  templateUrl: 'invoice-detail.html',
})
export class InvoiceDetailPage implements OnInit {
  invoice: Invoice = {};

  constructor(
    private navController: NavController,
    private invoiceService: InvoiceService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.invoice = response.data;
    });
  }

  open(item: Invoice) {
    this.navController.navigateForward('/tabs/entities/invoice/' + item.id + '/edit');
  }

  async deleteModal(item: Invoice) {
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
            this.invoiceService.delete(item.id).subscribe(() => {
              this.navController.navigateForward('/tabs/entities/invoice');
            });
          },
        },
      ],
    });
    await alert.present();
  }
}

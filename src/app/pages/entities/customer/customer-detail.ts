import { Component, OnInit } from '@angular/core';
import { Customer } from './customer.model';
import { CustomerService } from './customer.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-customer-detail',
  templateUrl: 'customer-detail.html',
})
export class CustomerDetailPage implements OnInit {
  customer: Customer = {};

  constructor(
    private navController: NavController,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.customer = response.data;
    });
  }

  open(item: Customer) {
    this.navController.navigateForward('/tabs/entities/customer/' + item.id + '/edit');
  }

  async deleteModal(item: Customer) {
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
            this.customerService.delete(item.id).subscribe(() => {
              this.navController.navigateForward('/tabs/entities/customer');
            });
          },
        },
      ],
    });
    await alert.present();
  }
}

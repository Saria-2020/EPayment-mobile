import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Customer } from './customer.model';
import { CustomerService } from './customer.service';

@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {
  customers: Customer[];

  // todo: add pagination

  constructor(
    private navController: NavController,
    private customerService: CustomerService,
    private toastCtrl: ToastController,
    public plt: Platform
  ) {
    this.customers = [];
  }

  ionViewWillEnter() {
    this.loadAll();
  }

  async loadAll(refresher?) {
    this.customerService
      .query()
      .pipe(
        filter((res: HttpResponse<Customer[]>) => res.ok),
        map((res: HttpResponse<Customer[]>) => res.body)
      )
      .subscribe(
        (response: Customer[]) => {
          this.customers = response;
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

  trackId(index: number, item: Customer) {
    return item.id;
  }

  new() {
    this.navController.navigateForward('/tabs/entities/customer/new');
  }

  edit(item: IonItemSliding, customer: Customer) {
    this.navController.navigateForward('/tabs/entities/customer/' + customer.id + '/edit');
    item.close();
  }

  async delete(customer) {
    this.customerService.delete(customer.id).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({ message: 'Customer deleted successfully.', duration: 3000, position: 'middle' });
        toast.present();
        this.loadAll();
      },
      (error) => console.error(error)
    );
  }

  view(customer: Customer) {
    this.navController.navigateForward('/tabs/entities/customer/' + customer.id + '/view');
  }
}

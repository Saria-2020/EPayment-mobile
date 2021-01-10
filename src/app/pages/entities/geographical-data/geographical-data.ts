import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { GeographicalData } from './geographical-data.model';
import { GeographicalDataService } from './geographical-data.service';

@Component({
  selector: 'page-geographical-data',
  templateUrl: 'geographical-data.html',
})
export class GeographicalDataPage {
  geographicalData: GeographicalData[];

  // todo: add pagination

  constructor(
    private navController: NavController,
    private geographicalDataService: GeographicalDataService,
    private toastCtrl: ToastController,
    public plt: Platform
  ) {
    this.geographicalData = [];
  }

  ionViewWillEnter() {
    this.loadAll();
  }

  async loadAll(refresher?) {
    this.geographicalDataService
      .query()
      .pipe(
        filter((res: HttpResponse<GeographicalData[]>) => res.ok),
        map((res: HttpResponse<GeographicalData[]>) => res.body)
      )
      .subscribe(
        (response: GeographicalData[]) => {
          this.geographicalData = response;
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

  trackId(index: number, item: GeographicalData) {
    return item.id;
  }

  new() {
    this.navController.navigateForward('/tabs/entities/geographical-data/new');
  }

  edit(item: IonItemSliding, geographicalData: GeographicalData) {
    this.navController.navigateForward('/tabs/entities/geographical-data/' + geographicalData.id + '/edit');
    item.close();
  }

  async delete(geographicalData) {
    this.geographicalDataService.delete(geographicalData.id).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({
          message: 'GeographicalData deleted successfully.',
          duration: 3000,
          position: 'middle',
        });
        toast.present();
        this.loadAll();
      },
      (error) => console.error(error)
    );
  }

  view(geographicalData: GeographicalData) {
    this.navController.navigateForward('/tabs/entities/geographical-data/' + geographicalData.id + '/view');
  }
}

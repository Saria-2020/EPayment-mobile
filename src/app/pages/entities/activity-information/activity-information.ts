import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { JhiDataUtils } from 'ng-jhipster';
import { ActivityInformation } from './activity-information.model';
import { ActivityInformationService } from './activity-information.service';

@Component({
  selector: 'page-activity-information',
  templateUrl: 'activity-information.html',
})
export class ActivityInformationPage {
  activityInformations: ActivityInformation[];

  // todo: add pagination

  constructor(
    private dataUtils: JhiDataUtils,
    private navController: NavController,
    private activityInformationService: ActivityInformationService,
    private toastCtrl: ToastController,
    public plt: Platform
  ) {
    this.activityInformations = [];
  }

  ionViewWillEnter() {
    this.loadAll();
  }

  async loadAll(refresher?) {
    this.activityInformationService
      .query()
      .pipe(
        filter((res: HttpResponse<ActivityInformation[]>) => res.ok),
        map((res: HttpResponse<ActivityInformation[]>) => res.body)
      )
      .subscribe(
        (response: ActivityInformation[]) => {
          this.activityInformations = response;
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

  trackId(index: number, item: ActivityInformation) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  new() {
    this.navController.navigateForward('/tabs/entities/activity-information/new');
  }

  edit(item: IonItemSliding, activityInformation: ActivityInformation) {
    this.navController.navigateForward('/tabs/entities/activity-information/' + activityInformation.id + '/edit');
    item.close();
  }

  async delete(activityInformation) {
    this.activityInformationService.delete(activityInformation.id).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({
          message: 'ActivityInformation deleted successfully.',
          duration: 3000,
          position: 'middle',
        });
        toast.present();
        this.loadAll();
      },
      (error) => console.error(error)
    );
  }

  view(activityInformation: ActivityInformation) {
    this.navController.navigateForward('/tabs/entities/activity-information/' + activityInformation.id + '/view');
  }
}

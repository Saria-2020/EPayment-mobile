import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { ActivityInformation } from './activity-information.model';
import { ActivityInformationService } from './activity-information.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-activity-information-detail',
  templateUrl: 'activity-information-detail.html',
})
export class ActivityInformationDetailPage implements OnInit {
  activityInformation: ActivityInformation = {};

  constructor(
    private dataUtils: JhiDataUtils,
    private navController: NavController,
    private activityInformationService: ActivityInformationService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.activityInformation = response.data;
    });
  }

  open(item: ActivityInformation) {
    this.navController.navigateForward('/tabs/entities/activity-information/' + item.id + '/edit');
  }

  async deleteModal(item: ActivityInformation) {
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
            this.activityInformationService.delete(item.id).subscribe(() => {
              this.navController.navigateForward('/tabs/entities/activity-information');
            });
          },
        },
      ],
    });
    await alert.present();
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
}

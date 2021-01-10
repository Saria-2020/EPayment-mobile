import { Component, OnInit } from '@angular/core';
import { GeographicalData } from './geographical-data.model';
import { GeographicalDataService } from './geographical-data.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-geographical-data-detail',
  templateUrl: 'geographical-data-detail.html',
})
export class GeographicalDataDetailPage implements OnInit {
  geographicalData: GeographicalData = {};

  constructor(
    private navController: NavController,
    private geographicalDataService: GeographicalDataService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.geographicalData = response.data;
    });
  }

  open(item: GeographicalData) {
    this.navController.navigateForward('/tabs/entities/geographical-data/' + item.id + '/edit');
  }

  async deleteModal(item: GeographicalData) {
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
            this.geographicalDataService.delete(item.id).subscribe(() => {
              this.navController.navigateForward('/tabs/entities/geographical-data');
            });
          },
        },
      ],
    });
    await alert.present();
  }
}

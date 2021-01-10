import { Component, OnInit } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html',
})
export class CategoryDetailPage implements OnInit {
  category: Category = {};

  constructor(
    private dataUtils: JhiDataUtils,
    private navController: NavController,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.category = response.data;
    });
  }

  open(item: Category) {
    this.navController.navigateForward('/tabs/entities/category/' + item.id + '/edit');
  }

  async deleteModal(item: Category) {
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
            this.categoryService.delete(item.id).subscribe(() => {
              this.navController.navigateForward('/tabs/entities/category');
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

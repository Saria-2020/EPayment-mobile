import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { UserRouteAccessService } from 'src/app/services/auth/user-route-access.service';
import { EntitiesPage } from './entities.page';

const routes: Routes = [
  {
    path: '',
    component: EntitiesPage,
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'customer',
    loadChildren: './customer/customer.module#CustomerPageModule',
  },
  {
    path: 'invoice',
    loadChildren: './invoice/invoice.module#InvoicePageModule',
  },
  {
    path: 'invoice-item',
    loadChildren: './invoice-item/invoice-item.module#InvoiceItemPageModule',
  },
  {
    path: 'geographical-data',
    loadChildren: './geographical-data/geographical-data.module#GeographicalDataPageModule',
  },
  {
    path: 'activity-information',
    loadChildren: './activity-information/activity-information.module#ActivityInformationPageModule',
  },
  {
    path: 'category',
    loadChildren: './category/category.module#CategoryPageModule',
  },
  {
    path: 'payment-info',
    loadChildren: './payment-info/payment-info.module#PaymentInfoPageModule',
  },
  {
    path: 'transaction',
    loadChildren: './transaction/transaction.module#TransactionPageModule',
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, RouterModule.forChild(routes), TranslateModule],
  declarations: [EntitiesPage],
})
export class EntitiesPageModule {}

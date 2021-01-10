import { NgModule, Injectable } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRouteAccessService } from '../../../services/auth/user-route-access.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

import { InvoiceItemPage } from './invoice-item';
import { InvoiceItemUpdatePage } from './invoice-item-update';
import { InvoiceItem, InvoiceItemService, InvoiceItemDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class InvoiceItemResolve implements Resolve<InvoiceItem> {
  constructor(private service: InvoiceItemService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InvoiceItem> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<InvoiceItem>) => response.ok),
        map((invoiceItem: HttpResponse<InvoiceItem>) => invoiceItem.body)
      );
    }
    return of(new InvoiceItem());
  }
}

const routes: Routes = [
  {
    path: '',
    component: InvoiceItemPage,
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InvoiceItemUpdatePage,
    resolve: {
      data: InvoiceItemResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InvoiceItemDetailPage,
    resolve: {
      data: InvoiceItemResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InvoiceItemUpdatePage,
    resolve: {
      data: InvoiceItemResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  declarations: [InvoiceItemPage, InvoiceItemUpdatePage, InvoiceItemDetailPage],
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule, TranslateModule, RouterModule.forChild(routes)],
})
export class InvoiceItemPageModule {}

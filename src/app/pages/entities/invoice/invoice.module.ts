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
import { BrowserModule } from '@angular/platform-browser';

import { InvoicePage } from './invoice';
import { InvoiceUpdatePage } from './invoice-update';
import { Invoice, InvoiceService, InvoiceDetailPage } from '.';
import { PaymentPageComponent } from './payment-page/payment-page.component';

@Injectable({ providedIn: 'root' })
export class InvoiceResolve implements Resolve<Invoice> {
  constructor(private service: InvoiceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Invoice> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Invoice>) => response.ok),
        map((invoice: HttpResponse<Invoice>) => invoice.body)
      );
    }
    return of(new Invoice());
  }
}

const routes: Routes = [
  {
    path: '',
    component: InvoicePage,
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InvoiceUpdatePage,
    resolve: {
      data: InvoiceResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InvoiceDetailPage,
    resolve: {
      data: InvoiceResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InvoiceUpdatePage,
    resolve: {
      data: InvoiceResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ":id/pay",
    component: PaymentPageComponent,
    resolve: {
      data: InvoiceResolve
    },
    data: {
      authorities: ['ROLE_USER'],

    },
    canActivate: [UserRouteAccessService]
  }
];

@NgModule({
  declarations: [InvoicePage, InvoiceUpdatePage, InvoiceDetailPage, PaymentPageComponent],
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule, TranslateModule, RouterModule.forChild(routes)],
})
export class InvoicePageModule { }

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

import { PaymentInfoPage } from './payment-info';
import { PaymentInfoUpdatePage } from './payment-info-update';
import { PaymentInfo, PaymentInfoService, PaymentInfoDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class PaymentInfoResolve implements Resolve<PaymentInfo> {
  constructor(private service: PaymentInfoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaymentInfo> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PaymentInfo>) => response.ok),
        map((paymentInfo: HttpResponse<PaymentInfo>) => paymentInfo.body)
      );
    }
    return of(new PaymentInfo());
  }
}

const routes: Routes = [
  {
    path: '',
    component: PaymentInfoPage,
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PaymentInfoUpdatePage,
    resolve: {
      data: PaymentInfoResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PaymentInfoDetailPage,
    resolve: {
      data: PaymentInfoResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PaymentInfoUpdatePage,
    resolve: {
      data: PaymentInfoResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  declarations: [PaymentInfoPage, PaymentInfoUpdatePage, PaymentInfoDetailPage],
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule, TranslateModule, RouterModule.forChild(routes)],
})
export class PaymentInfoPageModule { }

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

import { GeographicalDataPage } from './geographical-data';
import { GeographicalDataUpdatePage } from './geographical-data-update';
import { GeographicalData, GeographicalDataService, GeographicalDataDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class GeographicalDataResolve implements Resolve<GeographicalData> {
  constructor(private service: GeographicalDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GeographicalData> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<GeographicalData>) => response.ok),
        map((geographicalData: HttpResponse<GeographicalData>) => geographicalData.body)
      );
    }
    return of(new GeographicalData());
  }
}

const routes: Routes = [
  {
    path: '',
    component: GeographicalDataPage,
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GeographicalDataUpdatePage,
    resolve: {
      data: GeographicalDataResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GeographicalDataDetailPage,
    resolve: {
      data: GeographicalDataResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GeographicalDataUpdatePage,
    resolve: {
      data: GeographicalDataResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  declarations: [GeographicalDataPage, GeographicalDataUpdatePage, GeographicalDataDetailPage],
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule, TranslateModule, RouterModule.forChild(routes)],
})
export class GeographicalDataPageModule {}

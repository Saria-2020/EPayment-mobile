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

import { ActivityInformationPage } from './activity-information';
import { ActivityInformationUpdatePage } from './activity-information-update';
import { ActivityInformation, ActivityInformationService, ActivityInformationDetailPage } from '.';

@Injectable({ providedIn: 'root' })
export class ActivityInformationResolve implements Resolve<ActivityInformation> {
  constructor(private service: ActivityInformationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ActivityInformation> {
    const id = route.params.id ? route.params.id : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ActivityInformation>) => response.ok),
        map((activityInformation: HttpResponse<ActivityInformation>) => activityInformation.body)
      );
    }
    return of(new ActivityInformation());
  }
}

const routes: Routes = [
  {
    path: '',
    component: ActivityInformationPage,
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ActivityInformationUpdatePage,
    resolve: {
      data: ActivityInformationResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ActivityInformationDetailPage,
    resolve: {
      data: ActivityInformationResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ActivityInformationUpdatePage,
    resolve: {
      data: ActivityInformationResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  declarations: [ActivityInformationPage, ActivityInformationUpdatePage, ActivityInformationDetailPage],
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule, TranslateModule, RouterModule.forChild(routes)],
})
export class ActivityInformationPageModule {}

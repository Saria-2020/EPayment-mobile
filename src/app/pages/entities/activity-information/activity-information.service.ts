import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { ActivityInformation } from './activity-information.model';

@Injectable({ providedIn: 'root' })
export class ActivityInformationService {
  private resourceUrl = ApiService.API_URL + '/activity-informations';

  constructor(protected http: HttpClient) {}

  create(activityInformation: ActivityInformation): Observable<HttpResponse<ActivityInformation>> {
    return this.http.post<ActivityInformation>(this.resourceUrl, activityInformation, { observe: 'response' });
  }

  update(activityInformation: ActivityInformation): Observable<HttpResponse<ActivityInformation>> {
    return this.http.put(this.resourceUrl, activityInformation, { observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<ActivityInformation>> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<ActivityInformation[]>> {
    const options = createRequestOption(req);
    return this.http.get<ActivityInformation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

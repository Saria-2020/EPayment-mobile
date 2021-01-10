import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { GeographicalData } from './geographical-data.model';

@Injectable({ providedIn: 'root' })
export class GeographicalDataService {
  private resourceUrl = ApiService.API_URL + '/geographical-data';

  constructor(protected http: HttpClient) {}

  create(geographicalData: GeographicalData): Observable<HttpResponse<GeographicalData>> {
    return this.http.post<GeographicalData>(this.resourceUrl, geographicalData, { observe: 'response' });
  }

  update(geographicalData: GeographicalData): Observable<HttpResponse<GeographicalData>> {
    return this.http.put(this.resourceUrl, geographicalData, { observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<GeographicalData>> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<GeographicalData[]>> {
    const options = createRequestOption(req);
    return this.http.get<GeographicalData[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

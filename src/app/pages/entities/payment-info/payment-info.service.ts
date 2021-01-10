import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { PaymentInfo } from './payment-info.model';

@Injectable({ providedIn: 'root' })
export class PaymentInfoService {
  private resourceUrl = ApiService.API_URL + '/payment-infos';

  constructor(protected http: HttpClient) {}

  create(paymentInfo: PaymentInfo): Observable<HttpResponse<PaymentInfo>> {
    return this.http.post<PaymentInfo>(this.resourceUrl, paymentInfo, { observe: 'response' });
  }

  update(paymentInfo: PaymentInfo): Observable<HttpResponse<PaymentInfo>> {
    return this.http.put(this.resourceUrl, paymentInfo, { observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<PaymentInfo>> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<PaymentInfo[]>> {
    const options = createRequestOption(req);
    return this.http.get<PaymentInfo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

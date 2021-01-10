import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Invoice } from './invoice.model';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private resourceUrl = ApiService.API_URL + '/invoices';

  constructor(protected http: HttpClient) {}

  create(invoice: Invoice): Observable<HttpResponse<Invoice>> {
    return this.http.post<Invoice>(this.resourceUrl, invoice, { observe: 'response' });
  }

  update(invoice: Invoice): Observable<HttpResponse<Invoice>> {
    return this.http.put(this.resourceUrl, invoice, { observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<Invoice>> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<Invoice[]>> {
    const options = createRequestOption(req);
    return this.http.get<Invoice[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

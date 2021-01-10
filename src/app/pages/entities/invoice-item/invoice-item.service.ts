import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { InvoiceItem } from './invoice-item.model';

@Injectable({ providedIn: 'root' })
export class InvoiceItemService {
  private resourceUrl = ApiService.API_URL + '/invoice-items';

  constructor(protected http: HttpClient) {}

  create(invoiceItem: InvoiceItem): Observable<HttpResponse<InvoiceItem>> {
    return this.http.post<InvoiceItem>(this.resourceUrl, invoiceItem, { observe: 'response' });
  }

  update(invoiceItem: InvoiceItem): Observable<HttpResponse<InvoiceItem>> {
    return this.http.put(this.resourceUrl, invoiceItem, { observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<InvoiceItem>> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<InvoiceItem[]>> {
    const options = createRequestOption(req);
    return this.http.get<InvoiceItem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

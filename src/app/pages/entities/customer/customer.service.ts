import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { Customer } from './customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private resourceUrl = ApiService.API_URL + '/customers';

  constructor(protected http: HttpClient) {}

  create(customer: Customer): Observable<HttpResponse<Customer>> {
    return this.http.post<Customer>(this.resourceUrl, customer, { observe: 'response' });
  }

  update(customer: Customer): Observable<HttpResponse<Customer>> {
    return this.http.put(this.resourceUrl, customer, { observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<Customer>> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<Customer[]>> {
    const options = createRequestOption(req);
    return this.http.get<Customer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

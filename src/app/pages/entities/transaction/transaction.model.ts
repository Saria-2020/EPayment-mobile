import { BaseEntity } from 'src/model/base-entity';
import { Invoice } from '../invoice/invoice.model';
import { PaymentInfo } from '../payment-info/payment-info.model';

export class Transaction implements BaseEntity {
  constructor(
    public id?: number,
    public name?: string,
    public uuid?: string,
    public amount?: number,
    public dateTime?: any,
    public paymentDetails?: string,
    public invoice?: Invoice,
    public paymentInfo?: PaymentInfo
  ) {}
}

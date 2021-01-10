import { BaseEntity } from 'src/model/base-entity';
import { Transaction } from '../transaction/transaction.model';
import { InvoiceItem } from '../invoice-item/invoice-item.model';
import { Customer } from '../customer/customer.model';

export class Invoice implements BaseEntity {
  constructor(
    public id?: number,
    public invoiceNumber?: string,
    public date?: any,
    public verificationNumber?: string,
    public unitName?: string,
    public totalAmount?: number,
    public amountPaid?: number,
    public paid?: boolean,
    public transaction?: Transaction,
    public items?: InvoiceItem[],
    public customer?: Customer
  ) {
    this.paid = false;
  }
}

import { BaseEntity } from 'src/model/base-entity';
import { Transaction } from '../transaction/transaction.model';
import { Customer } from '../customer/customer.model';

export class PaymentInfo implements BaseEntity {
  constructor(
    public id?: number,
    public balance?: number,
    public name?: string,
    public accountNumber?: string,
    public cardNumber?: string,
    public transactions?: Transaction[],
    public customer?: Customer
  ) { }
}

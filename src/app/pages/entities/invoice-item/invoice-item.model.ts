import { BaseEntity } from 'src/model/base-entity';
import { Invoice } from '../invoice/invoice.model';

export class InvoiceItem implements BaseEntity {
  constructor(public id?: number, public name?: string, public amount?: number, public invoice?: Invoice) {}
}

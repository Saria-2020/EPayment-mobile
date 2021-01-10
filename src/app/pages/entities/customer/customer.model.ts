import { BaseEntity } from 'src/model/base-entity';
import { User } from '../../../services/user/user.model';
import { Invoice } from '../invoice/invoice.model';
import { ActivityInformation } from '../activity-information/activity-information.model';
import { GeographicalData } from '../geographical-data/geographical-data.model';
import { PaymentInfo } from '../payment-info/payment-info.model';
import { Transaction } from '../transaction';

export class Customer implements BaseEntity {
  constructor(
    public id?: number,
    public phoneNumber?: string,
    public nationalId?: string,
    public user?: User,
    public invoices?: Invoice[],
    public activityInformations?: ActivityInformation[],
    public geographicalData?: GeographicalData[],
    public accounts?: PaymentInfo[],
    public transaction?: Transaction[]
  ) { }
}

import { BaseEntity } from 'src/model/base-entity';
import { Customer } from '../customer/customer.model';

export class GeographicalData implements BaseEntity {
  constructor(
    public id?: number,
    public state?: string,
    public units?: string,
    public district?: string,
    public square?: string,
    public realEstateNumber?: string,
    public activityNumber?: string,
    public areaOfTheRealEstate?: string,
    public customer?: Customer
  ) {}
}

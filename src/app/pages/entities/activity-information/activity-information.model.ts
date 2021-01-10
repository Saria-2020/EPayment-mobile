import { BaseEntity } from 'src/model/base-entity';
import { Customer } from '../customer/customer.model';
import { Category } from '../category/category.model';

export class ActivityInformation implements BaseEntity {
  constructor(
    public id?: number,
    public name?: string,
    public sector?: string,
    public typeOfActivity?: string,
    public propertyType?: string,
    public areaClass?: string,
    public architectureType?: string,
    public numberOfFloors?: string,
    public features?: string,
    public descriptionOfTheFeatures?: any,
    public customer?: Customer,
    public category?: Category
  ) {}
}

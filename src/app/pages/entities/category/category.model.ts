import { BaseEntity } from 'src/model/base-entity';
import { ActivityInformation } from '../activity-information/activity-information.model';

export class Category implements BaseEntity {
  constructor(public id?: number, public name?: string, public description?: any, public activityInformations?: ActivityInformation[]) {}
}

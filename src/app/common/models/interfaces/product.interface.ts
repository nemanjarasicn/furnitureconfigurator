import { BasinCount } from '../../enums/basin-count-enum';
import { BasinType } from '../../enums/basin-type-enum';
import { IConfigurationItemOption } from './configuration-item-option.interface';

export interface IProduct {
  basinCount: IConfigurationItemOption | undefined;
  basinType: IConfigurationItemOption | undefined;
}

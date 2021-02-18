import { ConfigurationOptionType } from '../../enums/configuration-option-type.enum';
import { IConfigurationDepdency } from './configuration-dependency.interface';
import { IConfigurationItemOption } from './configuration-item-option.interface';

export interface IConfigurationItem {
  key: string;
  title: string;
  description?: string;
  type: ConfigurationOptionType;
  options: IConfigurationItemOption[];
  dependsOn?: IConfigurationDepdency;
  tileSize?: number;
}

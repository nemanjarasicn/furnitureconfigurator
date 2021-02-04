import { ConfigurationOptionType } from "../../enums/configuration-option-type.enum";
import { IConfigurationItemOption } from "./configuration-item-option.interface";

export interface IConfigurationItem {

  key: string;
  title?: string;
  description?: string;
  type: ConfigurationOptionType
  options: IConfigurationItemOption[];

}

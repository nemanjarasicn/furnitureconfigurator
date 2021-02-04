import { IConfigurationItem } from "./configuration-item.interface";

export interface IConfigurationGroup {
  title: string;
  description?: string;
  anchorLink: string
  items: IConfigurationItem[];
}

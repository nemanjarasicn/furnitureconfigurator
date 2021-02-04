import { BasinCount } from "../enums/basin-count-enum";
import { BasinType } from "../enums/basin-type-enum";
import { IConfigurationItemOption } from "./interfaces/configuration-item-option.interface";
import { IProduct } from "./interfaces/product.interface";

export class Product implements IProduct {

  basinCount: IConfigurationItemOption | undefined;
  basinType: IConfigurationItemOption | undefined;
}

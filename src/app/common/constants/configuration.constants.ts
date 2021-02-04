import { basinConfig } from "../config/basin-group.config";
import { BasinType } from "../enums/basin-type-enum";
import { IConfigurationGroup } from "../models/interfaces/configuration-group.interface";

export abstract class ConfigurationConstants {

  public static readonly CONFIGURATION_FORM: IConfigurationGroup[] = [
    basinConfig
  ]

}

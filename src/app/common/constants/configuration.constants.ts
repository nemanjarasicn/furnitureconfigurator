import { basinConfig } from "../config/basin-group.config";
import { cabinetConfig } from "../config/cabinet-group.config";
import { IBreadcrumb } from "../models/interfaces/breadcrumb.interface";
import { IConfigurationGroup } from "../models/interfaces/configuration-group.interface";
import { IConfigurationItem } from "../models/interfaces/configuration-item.interface";

export abstract class ConfigurationConstants {

  public static readonly CONFIGURATION_FORM: IConfigurationGroup[] = [
    basinConfig,
    cabinetConfig
  ];

  public static readonly DEFAULT_TILE_SIZE_PX = 150;

  public static getConfigurationBreadCrumbs() {

    let breadcrumbs: IBreadcrumb[] = [];
    ConfigurationConstants.CONFIGURATION_FORM.forEach((group: IConfigurationGroup) => {

      const items: IBreadcrumb[] = group.items.map((item: IConfigurationItem) => { return { title: item.title, anchor: `#${item.key}` } });
      breadcrumbs = breadcrumbs.concat(items);
    })

    return breadcrumbs;
  }

}

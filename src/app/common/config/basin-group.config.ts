import { BasinType } from "../enums/basin-type-enum";
import { ConfigurationOptionType } from "../enums/configuration-option-type.enum";
import { IConfigurationGroup } from "../models/interfaces/configuration-group.interface";

const basinConfig: IConfigurationGroup = {
  title: 'CONFIGURATION.BASIN.GROUP_TITLE',
  items: [
    {
      key: 'basinCount',
      title: 'CONFIGURATION.BASIN.ITEMS.BASIN_COUNT.TITLE',
      description: 'CONFIGURATION.BASIN.ITEMS.BASIN_COUNT.DESCRIPTION',
      type: ConfigurationOptionType.TILE,
      options: [
        {
          label: 'CONFIGURATION.BASIN.ITEMS.BASIN_COUNT.OPTIONS.SINGLE.LABEL',
          description: 'CONFIGURATION.BASIN.ITEMS.BASIN_COUNT.OPTIONS.SINGLE.DESCRIPTION',
          value: BasinType.SINGLE,
          previewUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_COUNT.OPTIONS.SINGLE.PREVIEW_URL',
          imageUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_COUNT.OPTIONS.SINGLE.IMAGE_URL',
        },
        {
          label: 'CONFIGURATION.BASIN.ITEMS.BASIN_COUNT.OPTIONS.DOUBLE.LABEL',
          description: 'CONFIGURATION.BASIN.ITEMS.BASIN_COUNT.OPTIONS.DOUBLE.DESCRIPTION',
          value: BasinType.DOUBLE,
          previewUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_COUNT.OPTIONS.DOUBLE.PREVIEW_URL',
          imageUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_COUNT.OPTIONS.DOUBLE.IMAGE_URL',
        },
      ]
    }
  ]
}

export { basinConfig }

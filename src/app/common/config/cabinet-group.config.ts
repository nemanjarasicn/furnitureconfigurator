import { ConfigurationOptionType } from "../enums/configuration-option-type.enum";
import { IConfigurationGroup } from "../models/interfaces/configuration-group.interface";
import { colorOptions } from "./color-options.config";

const cabinetConfig: IConfigurationGroup = {
  title: 'CONFIGURATION.CABINET.GROUP_TITLE',
  anchorLink: 'cabinet',
  items: [
    {
      key: 'cabinetMeasures',
      title: 'CONFIGURATION.CABINET.ITEMS.CABINET_MEASURES.TITLE',
      description: 'CONFIGURATION.CABINET.ITEMS.CABINET_MEASURES.DESCRIPTION',
      type: ConfigurationOptionType.INPUT,
      options: [
        {
          label: 'CONFIGURATION.CABINET.ITEMS.CABINET_MEASURES.OPTIONS.WIDTH.LABEL',
          description: 'CONFIGURATION.CABINET.ITEMS.CABINET_MEASURES.OPTIONS.WIDTH.DESCRIPTION',
          value: 0,
          imageUrl: 'CONFIGURATION.CABINET.ITEMS.CABINET_MEASURES.OPTIONS.WIDTH.IMAGE_URL',
        },
        {
          label: 'CONFIGURATION.CABINET.ITEMS.CABINET_MEASURES.OPTIONS.DEPTH.LABEL',
          description: 'CONFIGURATION.CABINET.ITEMS.CABINET_MEASURES.OPTIONS.DEPTH.DESCRIPTION',
          value: 0,
          imageUrl: 'CONFIGURATION.CABINET.ITEMS.CABINET_MEASURES.OPTIONS.DEPTH.IMAGE_URL',
        },
        {
          label: 'CONFIGURATION.CABINET.ITEMS.CABINET_MEASURES.OPTIONS.HEIGHT.LABEL',
          description: 'CONFIGURATION.CABINET.ITEMS.CABINET_MEASURES.OPTIONS.HEIGHT.DESCRIPTION',
          value: 0,
          imageUrl: 'CONFIGURATION.CABINET.ITEMS.CABINET_MEASURES.OPTIONS.HEIGHT.IMAGE_URL',
        },
      ]
    },
    {
      key: 'cabinetColor',
      title: 'CONFIGURATION.CABINET.ITEMS.CABINET_COLOR.TITLE',
      description: 'CONFIGURATION.CABINET.ITEMS.CABINET_COLOR.DESCRIPTION',
      type: ConfigurationOptionType.TILE,
      options: colorOptions,
      tileSize: 60
    },
    {
      key: 'frontColor',
      title: 'CONFIGURATION.CABINET.ITEMS.FRONT_COLOR.TITLE',
      description: 'CONFIGURATION.CABINET.ITEMS.FRONT_COLOR.DESCRIPTION',
      type: ConfigurationOptionType.TILE,
      options: colorOptions,
      tileSize: 60
    },
    {
      key: 'topColor',
      title: 'CONFIGURATION.CABINET.ITEMS.TOP_COLOR.TITLE',
      description: 'CONFIGURATION.CABINET.ITEMS.TOP_COLOR.DESCRIPTION',
      type: ConfigurationOptionType.TILE,
      options: colorOptions,
      tileSize: 60
    },
  ]
}

export { cabinetConfig }

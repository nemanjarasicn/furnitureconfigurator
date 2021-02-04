import { BasinCount } from "../enums/basin-count-enum";
import { BasinModel } from "../enums/basin-model.enum";
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
          value: BasinCount.SINGLE,
          previewUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_COUNT.OPTIONS.SINGLE.PREVIEW_URL',
          imageUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_COUNT.OPTIONS.SINGLE.IMAGE_URL',
        },
        {
          label: 'CONFIGURATION.BASIN.ITEMS.BASIN_COUNT.OPTIONS.DOUBLE.LABEL',
          description: 'CONFIGURATION.BASIN.ITEMS.BASIN_COUNT.OPTIONS.DOUBLE.DESCRIPTION',
          value: BasinCount.DOUBLE,
          previewUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_COUNT.OPTIONS.DOUBLE.PREVIEW_URL',
          imageUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_COUNT.OPTIONS.DOUBLE.IMAGE_URL',
        },
      ]
    },
    {
      key: 'basinType',
      title: 'CONFIGURATION.BASIN.ITEMS.BASIN_TYPE.TITLE',
      description: 'CONFIGURATION.BASIN.ITEMS.BASIN_TYPE.DESCRIPTION',
      type: ConfigurationOptionType.TILE,
      options: [
        {
          label: 'CONFIGURATION.BASIN.ITEMS.BASIN_TYPE.OPTIONS.COUNTERTOP.LABEL',
          description: 'CONFIGURATION.BASIN.ITEMS.BASIN_TYPE.OPTIONS.COUNTERTOP.DESCRIPTION',
          value: BasinType.COUNTERTOP,
          previewUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_TYPE.OPTIONS.COUNTERTOP.PREVIEW_URL',
          imageUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_TYPE.OPTIONS.COUNTERTOP.IMAGE_URL',
        },
        {
          label: 'CONFIGURATION.BASIN.ITEMS.BASIN_TYPE.OPTIONS.MADETOMEASURE.LABEL',
          description: 'CONFIGURATION.BASIN.ITEMS.BASIN_TYPE.OPTIONS.MADETOMEASURE.DESCRIPTION',
          value: BasinType.MADE_TO_MEASURE,
          previewUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_TYPE.OPTIONS.MADETOMEASURE.PREVIEW_URL',
          imageUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_TYPE.OPTIONS.MADETOMEASURE.IMAGE_URL',
        },
      ]
    },
    {
      key: 'basinMeasures',
      title: 'CONFIGURATION.BASIN.ITEMS.BASIN_MEASURES.TITLE',
      description: 'CONFIGURATION.BASIN.ITEMS.BASIN_MEASURES.DESCRIPTION',
      type: ConfigurationOptionType.INPUT,
      options: [
        {
          label: 'CONFIGURATION.BASIN.ITEMS.BASIN_MEASURES.OPTIONS.HEIGHT.LABEL',
          description: 'CONFIGURATION.BASIN.ITEMS.BASIN_MEASURES.OPTIONS.HEIGHT.DESCRIPTION',
          value: 0,
        },
        {
          label: 'CONFIGURATION.BASIN.ITEMS.BASIN_MEASURES.OPTIONS.WIDTH.LABEL',
          description: 'CONFIGURATION.BASIN.ITEMS.BASIN_MEASURES.OPTIONS.WIDTH.DESCRIPTION',
          value: 0,
        },
      ],
      dependsOn: {
        key: 'basinType',
        value: BasinType.MADE_TO_MEASURE
      }
    },
    {
      key: 'basinModel',
      title: 'CONFIGURATION.BASIN.ITEMS.BASIN_MODEL.TITLE',
      description: 'CONFIGURATION.BASIN.ITEMS.BASIN_MODEL.DESCRIPTION',
      type: ConfigurationOptionType.TILE,
      options: [
        {
          label: 'CONFIGURATION.BASIN.ITEMS.BASIN_MODEL.OPTIONS.MODEL3.LABEL',
          description: 'CONFIGURATION.BASIN.ITEMS.BASIN_MODEL.OPTIONS.MODEL3.DESCRIPTION',
          value: BasinModel.MODEL3,
          previewUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_MODEL.OPTIONS.MODEL3.PREVIEW_URL',
          imageUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_MODEL.OPTIONS.MODEL3.IMAGE_URL',
        },
        {
          label: 'CONFIGURATION.BASIN.ITEMS.BASIN_MODEL.OPTIONS.MODELY.LABEL',
          description: 'CONFIGURATION.BASIN.ITEMS.BASIN_MODEL.OPTIONS.MODELY.DESCRIPTION',
          value: BasinModel.MODELY,
          previewUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_MODEL.OPTIONS.MODELY.PREVIEW_URL',
          imageUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_MODEL.OPTIONS.MODELY.IMAGE_URL',
        },
        {
          label: 'CONFIGURATION.BASIN.ITEMS.BASIN_MODEL.OPTIONS.MODELS.LABEL',
          description: 'CONFIGURATION.BASIN.ITEMS.BASIN_MODEL.OPTIONS.MODELS.DESCRIPTION',
          value: BasinModel.MODELS,
          previewUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_MODEL.OPTIONS.MODELS.PREVIEW_URL',
          imageUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_MODEL.OPTIONS.MODELS.IMAGE_URL',
        },
        {
          label: 'CONFIGURATION.BASIN.ITEMS.BASIN_MODEL.OPTIONS.MODELX.LABEL',
          description: 'CONFIGURATION.BASIN.ITEMS.BASIN_MODEL.OPTIONS.MODELX.DESCRIPTION',
          value: BasinModel.MODELX,
          previewUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_MODEL.OPTIONS.MODELX.PREVIEW_URL',
          imageUrl: 'CONFIGURATION.BASIN.ITEMS.BASIN_MODEL.OPTIONS.MODELX.IMAGE_URL',
        },
      ]
    },
  ]
}

export { basinConfig }

import { ConfigurationOptionType } from '../enums/configuration-option-type.enum';
import { IConfigurationGroup } from '../models/interfaces/configuration-group.interface';
import { colorOptions } from './color-options.config';
import { canvasElementOptions } from './canvas-options-elements.config';
import { canvasTemplateOptions } from './canvas-options-template.config';
import { canvasHandlesOptions } from './canvas-options-handles.config';

const canvasConfig: IConfigurationGroup = {
  title: 'CONFIGURATION.CANVAS.GROUP_TITLE',
  anchorLink: 'canvasAnchor',
  items: [
    {
      key: 'templates',
      title: 'CONFIGURATION.CANVAS.ITEMS.TEMPLATES.TITLE',
      description: 'CONFIGURATION.CANVAS.ITEMS.TEMPLATES.DESCRIPTION',
      type: ConfigurationOptionType.TILE,
      options: canvasTemplateOptions,
      tileSize: 100,
    },
    {
      key: 'canvasElements',
      title: 'CONFIGURATION.CANVAS.ITEMS.ELEMENTS.TITLE',
      description: 'CONFIGURATION.CANVAS.ITEMS.ELEMENTS.DESCRIPTION',
      type: ConfigurationOptionType.TILE,
      options: canvasElementOptions,
      tileSize: 100,
    },
    {
      key: 'canvasColors',
      title: 'CONFIGURATION.CANVAS.ITEMS.COLORS.TITLE',
      description: 'CONFIGURATION.CANVAS.ITEMS.COLORS.DESCRIPTION',
      type: ConfigurationOptionType.TILE,
      options: colorOptions,
      tileSize: 60,
    },
    {
      key: 'canvasHandles',
      title: 'CONFIGURATION.CANVAS.ITEMS.HANDLES.TITLE',
      description: 'CONFIGURATION.CANVAS.ITEMS.HANDLES.DESCRIPTION',
      type: ConfigurationOptionType.TILE,
      options: canvasHandlesOptions,
      tileSize: 100,
    },
  ],
};

export { canvasConfig };

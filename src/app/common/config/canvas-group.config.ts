import { ConfigurationOptionType } from '../enums/configuration-option-type.enum';
import { IConfigurationGroup } from '../models/interfaces/configuration-group.interface';
import { colorOptions } from './color-options.config';
import { canvasElementOptions } from './canvas-options-elements.config';
import { canvasTemplateOptions } from './canvas-options-template.config';
import { canvasHandlesOptions } from './canvas-options-handles.config';

const canvasConfig: IConfigurationGroup = {
  title: 'CONFIGURATION.CANVAS.GROUP_TITLE',
  anchorLink: 'canvas',
  items: [
    {
      key: 'templates',
      title: 'CONFIGURATION.CANVAS.ITEMS.TEMPLATES.TITLE',
      description: 'CONFIGURATION.CANVAS.ITEMS.TEMPLATES.TITLE.DESCRIPTION',
      type: ConfigurationOptionType.TILE,
      options: canvasTemplateOptions,
      tileSize: 60,
    },
    {
      key: 'canvasElements',
      title: 'CONFIGURATION.CANVAS.ITEMS.CANVAS_ELEMENTS.TITLE',
      description: 'CONFIGURATION.CANVAS.ITEMS.CANVAS_ELEMENTS.DESCRIPTION',
      type: ConfigurationOptionType.TILE,
      options: canvasElementOptions,
      tileSize: 60,
    },
    {
      key: 'canvasColors',
      title: 'CONFIGURATION.CANVAS.ITEMS.CANVAS_COLORS.TITLE',
      description: 'CONFIGURATION.CANVAS.ITEMS.CANVAS_COLORS.TITLE',
      type: ConfigurationOptionType.TILE,
      options: colorOptions,
      tileSize: 60,
    },
    {
      key: 'canvasHandles',
      title: 'CONFIGURATION.CANVAS.ITEMS.CANVAS_HANDLES.TITLE',
      description:
        'CONFIGURATION.CANVAS.ITEMS.CANVAS_HANDLES.TITLE.DESCRIPTION',
      type: ConfigurationOptionType.TILE,
      options: canvasHandlesOptions,
      tileSize: 60,
    },
  ],
};

export { canvasConfig };

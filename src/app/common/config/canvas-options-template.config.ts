import { CanvasTemplates } from '../enums/canvas-templates.enum';
import { Utils } from '../helpers/utils';
import { IConfigurationItemOption } from '../models/interfaces/configuration-item-option.interface';
import { IDisplayValue } from '../models/interfaces/display-value.interface';

let canvasTemplateOptions: IConfigurationItemOption[] = [];

const templates: IDisplayValue[] = Utils.convertEnumToDisplayArray(
  CanvasTemplates
);

templates.forEach((element: IDisplayValue) => {
  canvasTemplateOptions.push({
    label: `CONFIGURATION.CANVAS_TEMPLATES.${element.displayValue}.LABEL`,
    description: `CONFIGURATION.CANVAS_TEMPLATES.${element.displayValue}.DESCRIPTION`,
    value: element.value,
    previewUrl: `CONFIGURATION.CANVAS_TEMPLATES.${element.displayValue}.PREVIEW_URL`,
    imageUrl: `CONFIGURATION.CANVAS_TEMPLATES.${element.displayValue}.IMAGE_URL`,
    type: 'canvas',
  });
});

export { canvasTemplateOptions };

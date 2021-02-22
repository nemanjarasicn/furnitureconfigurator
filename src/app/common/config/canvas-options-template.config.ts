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
    label: `CONFIGURATION.CANVAS-TEMPLATES.${element.displayValue}.LABEL`,
    description: `CONFIGURATION.CANVAS-TEMPLATES.${element.displayValue}.DESCRIPTION`,
    value: element.value,
    previewUrl: `CONFIGURATION.CANVAS-TEMPLATES.${element.displayValue}.PREVIEW_URL`,
    imageUrl: `CONFIGURATION.CANVAS-TEMPLATES.${element.displayValue}.IMAGE_URL`,
  });
});

export { canvasTemplateOptions };

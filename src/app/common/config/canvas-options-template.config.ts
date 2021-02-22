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
    label: `CONFIGURATION.COLORS.${element.displayValue}.LABEL`,
    description: `CONFIGURATION.COLORS.${element.displayValue}.DESCRIPTION`,
    value: element.value,
    previewUrl: `CONFIGURATION.COLORS.${element.displayValue}.PREVIEW_URL`,
    imageUrl: `CONFIGURATION.COLORS.${element.displayValue}.IMAGE_URL`,
  });
});

export { canvasTemplateOptions };

import { CanvasElements } from '../enums/canvas-elements.enum';
import { Utils } from '../helpers/utils';
import { IConfigurationItemOption } from '../models/interfaces/configuration-item-option.interface';
import { IDisplayValue } from '../models/interfaces/display-value.interface';

let canvasElementOptions: IConfigurationItemOption[] = [];

const elements: IDisplayValue[] = Utils.convertEnumToDisplayArray(
  CanvasElements
);

elements.forEach((element: IDisplayValue) => {
  canvasElementOptions.push({
    label: `CONFIGURATION.COLORS.${element.displayValue}.LABEL`,
    description: `CONFIGURATION.COLORS.${element.displayValue}.DESCRIPTION`,
    value: element.value,
    previewUrl: `CONFIGURATION.COLORS.${element.displayValue}.PREVIEW_URL`,
    imageUrl: `CONFIGURATION.COLORS.${element.displayValue}.IMAGE_URL`,
  });
});

export { canvasElementOptions };

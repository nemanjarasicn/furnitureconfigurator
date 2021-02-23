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
    label: `CONFIGURATION.CANVAS_ELEMENTS.${element.displayValue}.LABEL`,
    description: `CONFIGURATION.CANVAS_ELEMENTS.${element.displayValue}.DESCRIPTION`,
    value: element.value,
    previewUrl: `CONFIGURATION.CANVAS_ELEMENTS.${element.displayValue}.PREVIEW_URL`,
    imageUrl: `CONFIGURATION.CANVAS_ELEMENTS.${element.displayValue}.IMAGE_URL`,
    type: 'canvas',
  });
});

export { canvasElementOptions };

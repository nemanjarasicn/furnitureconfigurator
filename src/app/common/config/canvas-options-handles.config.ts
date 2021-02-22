import { CanvasHandles } from '../enums/canvas-handles.enum';
import { Utils } from '../helpers/utils';
import { IConfigurationItemOption } from '../models/interfaces/configuration-item-option.interface';
import { IDisplayValue } from '../models/interfaces/display-value.interface';

let canvasHandlesOptions: IConfigurationItemOption[] = [];

const handles: IDisplayValue[] = Utils.convertEnumToDisplayArray(CanvasHandles);

handles.forEach((element: IDisplayValue) => {
  canvasHandlesOptions.push({
    label: `CONFIGURATION.CANVAS_HANDLES.${element.displayValue}.LABEL`,
    description: `CONFIGURATION.CANVAS_HANDLES.${element.displayValue}.DESCRIPTION`,
    value: element.value,
    previewUrl: `CONFIGURATION.CANVAS_HANDLES.${element.displayValue}.PREVIEW_URL`,
    imageUrl: `CONFIGURATION.CANVAS_HANDLES.${element.displayValue}.IMAGE_URL`,
  });
});

export { canvasHandlesOptions };

import { CanvasColors} from '../enums/canvas-colors-enum';
import { Utils } from '../helpers/utils';
import { IConfigurationItemOption } from '../models/interfaces/configuration-item-option.interface';
import { IDisplayValue } from '../models/interfaces/display-value.interface';

let canvasColorsOptions: IConfigurationItemOption[] = [];

const canvasColors: IDisplayValue[] = Utils.convertEnumToDisplayArray(
  CanvasColors
);

canvasColors.forEach((element: IDisplayValue) => {
  canvasColorsOptions.push({
    label: `CONFIGURATION.COLORS.${element.displayValue}.LABEL`,
    description: `CONFIGURATION.COLORS.${element.displayValue}.DESCRIPTION`,
    value: element.value,
    previewUrl: `CONFIGURATION.COLORS.${element.displayValue}.PREVIEW_URL`,
    imageUrl: `CONFIGURATION.COLORS.${element.displayValue}.IMAGE_URL`,
    type: 'canvas',
  });
});

export { canvasColorsOptions };
import { Colors } from "../enums/colors.enum";
import { Utils } from "../helpers/utils";
import { IConfigurationItemOption } from "../models/interfaces/configuration-item-option.interface";
import { IDisplayValue } from "../models/interfaces/display-value.interface";

let colorOptions: IConfigurationItemOption[] = []

const colors: IDisplayValue[] = Utils.convertEnumToDisplayArray(Colors);

colors.forEach((color: IDisplayValue) => {
  colorOptions.push({
    label: `CONFIGURATION.COLORS.${color.displayValue}.LABEL`,
    description: `CONFIGURATION.COLORS.${color.displayValue}.DESCRIPTION`,
    value: color.value,
    previewUrl: `CONFIGURATION.COLORS.${color.displayValue}.PREVIEW_URL`,
    imageUrl: `CONFIGURATION.COLORS.${color.displayValue}.IMAGE_URL`,
  })
})

export {colorOptions}

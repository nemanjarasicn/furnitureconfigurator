import { IDisplayValue } from "../models/interfaces/display-value.interface";

export abstract class Utils {

  static convertEnumToDisplayArray(enumToConvert: any): IDisplayValue[] {
    let models: IDisplayValue[] = Object.keys(enumToConvert).filter(key => !isNaN(Number(enumToConvert[key]))).map(key => {

      let model: IDisplayValue = {
        displayValue: key,
        value: enumToConvert[key]
      }
      return model;
    });
    return models;
  }

}

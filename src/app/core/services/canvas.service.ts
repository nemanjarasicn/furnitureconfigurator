import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import * as $ from 'jquery';
import Konva from 'konva';
import { ICanvasDimensions } from '../../common/models/interfaces/canvas-dimensions.interface';
import { IConfigurationItemOption } from 'src/app/common/models/interfaces/configuration-item-option.interface';
import { IConfigurationItem } from 'src/app/common/models/interfaces/configuration-item.interface';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  private isCanvas$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  //For initial active option
  private hoveredItem$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  mainDimensions: BehaviorSubject<ICanvasDimensions> = new BehaviorSubject<ICanvasDimensions>(
    {
      height: 400,
      width: 400,
    }
  );

  selectedTemplateOption$: BehaviorSubject<IConfigurationItemOption> = new BehaviorSubject<IConfigurationItemOption>(
    {
      label: ' ',
      description: '',
      value: '',
      previewUrl: '',
      imageUrl: '',
      type: '',
    }
  );
  selectedElementOption$: BehaviorSubject<IConfigurationItemOption> = new BehaviorSubject<IConfigurationItemOption>(
    {
      label: ' ',
      description: '',
      value: '',
      previewUrl: '',
      imageUrl: '',
      type: '',
    }
  );
  selectedHandleOption$: BehaviorSubject<IConfigurationItemOption> = new BehaviorSubject<IConfigurationItemOption>(
    {
      label: ' ',
      description: '',
      value: '',
      previewUrl: '',
      imageUrl: '',
      type: '',
    }
  );
  selectedColorOption$: BehaviorSubject<IConfigurationItemOption> = new BehaviorSubject<IConfigurationItemOption>(
    {
      label: ' ',
      description: '',
      value: '',
      previewUrl: '',
      imageUrl: '',
      type: '',
    }
  );

  stage: any;
  layer: any;

  constructor() {}

  getCanvasState(): BehaviorSubject<boolean> {
    return this.isCanvas$;
  }
  setCanvasTrue() {
    this.isCanvas$.next(true);
  }
  setCanvasFalse() {
    this.isCanvas$.next(false);
  }

  getMainDimensions(): BehaviorSubject<ICanvasDimensions> {
    return this.mainDimensions;
  }
  getSelectedTemplate(): BehaviorSubject<IConfigurationItemOption> {
    return this.selectedTemplateOption$;
  }
  getSelectedHandle(): BehaviorSubject<IConfigurationItemOption> {
    return this.selectedHandleOption$;
  }
  getSelectedColor(): BehaviorSubject<IConfigurationItemOption> {
    return this.selectedColorOption$;
  }
  getSelectedElement(): BehaviorSubject<IConfigurationItemOption> {
    return this.selectedElementOption$;
  }

  setSelectedOption(selectedOption: IConfigurationItemOption) {
    selectedOption.description?.includes('CANVAS_TEMPLATES') &&
      this.selectedTemplateOption$.next(selectedOption);

    selectedOption.description?.includes('CANVAS_ELEMENTS') &&
      this.selectedElementOption$.next(selectedOption);

    selectedOption.description?.includes('CANVAS_HANDLES') &&
      this.selectedHandleOption$.next(selectedOption);

    selectedOption.description?.includes('COLORS') &&
      this.selectedColorOption$.next(selectedOption);
  }

  setHoveredItem(hoveredItem: IConfigurationItem) {
    this.hoveredItem$.next(hoveredItem);
  }
  getHoveredItem() {
    return this.hoveredItem$;
  }
}

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

  private canvasActiveElementSource$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  //For initial active option
  private hoveredItem$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  mainDimensions: BehaviorSubject<ICanvasDimensions> = new BehaviorSubject<ICanvasDimensions>(
    {
      height: 200,
      width: 200,
    }
  );

  mainWidth: BehaviorSubject<number> = new BehaviorSubject<number>(200);
  mainHeight: BehaviorSubject<number> = new BehaviorSubject<number>(200);

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

  setMainWidth(width: number) {
    this.mainWidth.next(Number(width));
  }
  setMainHeight(height: number) {
    this.mainHeight.next(Number(height));
  }

  getMainDimensions(): BehaviorSubject<ICanvasDimensions> {
    return this.mainDimensions;
  }

  getMainWidth(): BehaviorSubject<number> {
    return this.mainWidth;
  }
  getMainHeight(): BehaviorSubject<number> {
    return this.mainHeight;
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

  setActiveCanvasElementSource(source: string) {
    this.canvasActiveElementSource$.next(source);
  }
  getActiveCanvasElementSource() {
    return this.canvasActiveElementSource$;
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

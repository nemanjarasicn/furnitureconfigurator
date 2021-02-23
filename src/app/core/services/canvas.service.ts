import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import * as $ from 'jquery';
import Konva from 'konva';
import { ICanvasDimensions } from '../../common/models/interfaces/canvas-dimensions.interface';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  private isCanvas$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  mainDimensions: BehaviorSubject<ICanvasDimensions> = new BehaviorSubject<ICanvasDimensions>(
    {
      height: 400,
      width: 400,
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
}

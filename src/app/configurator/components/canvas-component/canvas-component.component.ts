import { Component, OnInit } from '@angular/core';
import { CanvasService } from '../../../core/services/canvas.service';
import { ICanvasStyleDimensions } from '../../../common/models/interfaces/canvas-style.interface';
import { ICanvasDimensions } from '../../../common/models/interfaces/canvas-dimensions.interface';
import * as $ from 'jquery';
import Konva from 'konva';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-canvas-component',
  templateUrl: './canvas-component.component.html',
  styleUrls: ['./canvas-component.component.scss'],
})
export class CanvasComponentComponent implements OnInit {
  mainDimensions: ICanvasDimensions = { width: 100, height: 100 };

  styleDimensions: ICanvasStyleDimensions = {
    width: `100px`,
    height: `100px`,
  };

  stage: any;
  layer: any;
  stageRectangle: any;
  gridLayer: any;
  snapWidth: number = 10;
  snapHeight: number = 10;
  MIN_WIDTH: number = 14;
  MIN_HEIGHT: number = 14;
  selectedHandleBarImgSource: string = '';

  constructor(private canvasService: CanvasService) {}

  ngOnInit(): void {
    this.canvasService.getMainDimensions().subscribe((data) => {
      this.setWidthHeightByRatio(
        data.width,
        data.height,
        this.mainDimensions.width,
        this.mainDimensions.height
      );
    });

    this.stage = new Konva.Stage({
      container: 'konva-canvas',
      width: this.mainDimensions.width,
      height: this.mainDimensions.height,
    });

    this.layer = new Konva.Layer({});
    this.stageRectangle = new Konva.Rect({
      x: this.stage.x(),
      y: this.stage.y(),
      width: this.stage.width(),
      height: this.stage.height(),
      fill: '#ebebeb',
    });
    this.gridLayer = new Konva.Layer({
      id: 'gridLayer',
    });
    this.stage.add(this.layer);
    this.layer.add(this.stageRectangle);

    this.addGridLayer(
      this.mainDimensions.width,
      this.mainDimensions.height,
      20,
      10,
      10
    );
    this.canvasService.getSelectedHandle().subscribe((data) => {
      console.log(data);
    });
    this.canvasService.getSelectedElement().subscribe((data) => {
      this.addNewElement(data);
    });

    this.canvasService.getSelectedColor().subscribe((data) => {
      console.log(data);
    });
    this.canvasService.getSelectedTemplate().subscribe((data) => {
      console.log(data);
    });

    this.stage.batchDraw();
  }

  addNewElement(data) {
    let id = uuidv4();
    data.description.includes('DOOR') ? `door${id}` : `drawer${id}`;

    this.newRectangle(
      this,
      this.layer,
      this.stage,
      id,
      this.stage.x(),
      this.stage.y(),
      20,
      20
    );
  }
  /*Function for adding grid layer with starting parameters of container*/
  addGridLayer(
    width: number,
    height: number,
    padding: number,
    widthSqNo: number,
    heightSqNo: number
  ) {
    this.snapWidth = Math.round(width / widthSqNo);
    this.snapHeight = Math.round(height / heightSqNo);

    for (let i = 0; i < widthSqNo; i++) {
      this.gridLayer.add(
        new Konva.Line({
          points: [
            Math.round((i * width) / widthSqNo) + 0.5,
            0,
            Math.round((i * width) / widthSqNo) + 0.5,
            height,
          ],
          stroke: '#ffffff',
          strokeWidth: 1,
        })
      );
    }

    this.gridLayer.add(new Konva.Line({ points: [0, 0, 10, 10] }));
    for (let j = 0; j < heightSqNo; j++) {
      this.gridLayer.add(
        new Konva.Line({
          points: [
            0,
            Math.round((j * height) / heightSqNo),
            width,
            Math.round((j * height) / heightSqNo),
          ],
          stroke: '#ffffff',
          strokeWidth: 0.5,
        })
      );
    }

    this.stage.add(this.gridLayer);
  }

  /*Function for creating a main new rectangle*/
  newRectangle(element, layer, stage, id, rectX, rectY, rectWidth, rectHeight) {
    let tr = new Konva.Transformer({
      rotateEnabled: false,
      boundBoxFunc: function (oldBoundBox, newBoundBox) {
        if (
          Math.abs(newBoundBox.width) < element.MIN_WIDTH ||
          Math.abs(newBoundBox.height) < element.MIN_HEIGHT
        ) {
          return oldBoundBox;
        }

        if (newBoundBox.y < 0 - 10) {
          return oldBoundBox;
        }

        if (newBoundBox.x < 0 - 10) {
          return oldBoundBox;
        }

        if (layer.width() + 10 < newBoundBox.x + newBoundBox.width) {
          return oldBoundBox;
        }

        if (layer.height() + 10 < newBoundBox.y + newBoundBox.height) {
          return oldBoundBox;
        }
        layer.batchDraw();
        return newBoundBox;
      },

      id: id,
      name: `transformer${id}`,
    });

    /*Color image --main rectangle */
    let imageObjRect = new Image();
    imageObjRect.onload = function () {
      var rectangle = new Konva.Image({
        name: `mainRectangle${id}`,
        x: rectX,
        y: rectY,
        image: imageObjRect,
        imgSource: `./assets/images/white.png`,
        width: stage.width() / 2,
        height: stage.height() / 2,
        draggable: true,
        stroke: 'black',
        borderColor: 'black',
        borderSize: 1,
        strokeWidth: 1,
        shadowColor: 'black',
        shadowBlur: 2,
        opacity: 0.8,
        easing: Konva.Easings.EaseIn,
        duration: 4,
        id: id,
      });

      /*Handlebar image*/
      let imageObj = new Image();
      imageObj.onload = function () {
        var imageContainer = new Konva.Image({
          name: `handleBarImage${id}`,
          x: rectangle.x() + (rectangle.width() - 128) / 2,
          y: rectangle.y() + rectangle.height() / 2 - 36,
          image: imageObj,
          width: 128,
          height: 72,
          id: id,
          opacity: 1,
        });

        let imageColorObj = new Image();
        imageColorObj.onload = function () {
          var imageColorContainer = new Konva.Image({
            name: `colorImage${id}`,
            x: rectangle.x() + rectangle.width() - 40,
            y: rectangle.y() + rectangle.height() - 40,
            image: imageColorObj,
            // imgSource: `${selectedColorImgSource}`,
            width: 40,
            height: 40,
            id: id,
            opacity: 1,
          });

          /*Delete rectangle container */
          let deleteRect = new Konva.Rect({
            x: rectangle.x(),
            y: rectangle.y(),
            width: 20,
            height: 20,
            fill: '#343a40',
            stroke: '#ddd',
            strokeWidth: 1,
            opacity: 0.8,
            id: id,
          });

          /*Delete rectangle line */
          let line1Delete = new Konva.Line({
            points: [
              deleteRect.x(),
              deleteRect.y() + deleteRect.height(),
              deleteRect.x() + deleteRect.width(),
              deleteRect.y(),
            ],
            stroke: '#fff',
            strokeWidth: 1,
            id: id,
          });

          /*Delete rectangle line */
          let line2Delete = new Konva.Line({
            points: [
              deleteRect.x(),
              deleteRect.y(),
              deleteRect.x() + deleteRect.width(),
              deleteRect.y() + deleteRect.height(),
            ],
            stroke: '#fff',
            strokeWidth: 1,
            id: id,
          });

          let textHeight = new Konva.Text({
            x: rectangle.x() + 5,
            y: rectangle.y() + rectangle.height() / 2,
            id: id,
          });
          let textWidth = new Konva.Text({
            x: rectangle.x() + rectangle.width() / 2,
            y: rectangle.y() + rectangle.height() - 15,
            id: id,
          });

          /*Shadow rectangle*/
          let shadowRectangle = new Konva.Rect({
            x: rectangle.x(),
            y: rectangle.y(),
            width: rectangle.width(),
            height: rectangle.height(),
            fill: '#f06a15',
            opacity: 0.6,
            stroke: '#CF6412',
            strokeWidth: 3,
            dash: [20, 2],
            id: id,
          });

          /*Diagonal line on the main element */
          let line = new Konva.Line({
            points: [
              rectangle.x(),
              rectangle.y() + rectangle.height(),
              rectangle.x() + rectangle.width(),
              rectangle.y(),
            ],
            stroke: '#fff',
            strokeWidth: 1,
            opacity: 0.5,
            id: id,
          });

          element.updateText(
            textHeight,
            textWidth,
            rectangle.width(),
            rectangle.height()
          );

          /*EVENT LISTENERS*/

          deleteRect.on('click', (e) => {
            let shapes = stage.children[0].children;
            let matching: any[] = [];
            console.log(stage);
            for (let i = 0; i < shapes.length; i++) {
              if (shapes[i].attrs.id == id) {
                matching.push(shapes[i]);
              }
            }
            for (let i = 0; i < matching.length; i++) {
              matching[i].destroy();
            }

            tr.hide();
            layer.draw();
          });
          line1Delete.on('click', (e) => {
            let shapes = stage.children[0].children;
            let matching: any[] = [];
            console.log(stage);
            for (let i = 0; i < shapes.length; i++) {
              if (shapes[i].attrs.id == id) {
                matching.push(shapes[i]);
              }
            }
            for (let i = 0; i < matching.length; i++) {
              matching[i].destroy();
            }

            tr.hide();
            layer.draw();
          });
          line2Delete.on('click', (e) => {
            let shapes = stage.children[0].children;
            let matching: any[] = [];
            console.log(stage);
            for (let i = 0; i < shapes.length; i++) {
              if (shapes[i].attrs.id == id) {
                matching.push(shapes[i]);
              }
            }
            for (let i = 0; i < matching.length; i++) {
              matching[i].destroy();
            }

            tr.hide();
            layer.draw();
          });

          rectangle.on('click', function (e) {
            element.addTransformer(
              element,
              tr,
              layer,
              rectangle,
              shadowRectangle,
              textHeight,
              textWidth,
              line,
              deleteRect,
              line1Delete,
              line2Delete,
              imageContainer,
              imageColorContainer
            );

            tr.attrs.visible == true ? tr.hide() : tr.show();
            element.removeSiblingCanvas(tr, 'Transformer');

            // element.setActiveValues(rectangle, imageContainer, imageColorContainer);

            // shadowRectangle.show();
            shadowRectangle.moveToTop();
            imageContainer.moveToTop();
            rectangle.moveToTop();
            imageColorContainer.moveToTop();
            textHeight.moveToTop();
            textWidth.moveToTop();
            line.moveToTop();
            deleteRect.moveToTop();
            line1Delete.moveToTop();
            line2Delete.moveToTop();
            tr.moveToTop();
            stage.batchDraw();
          });

          rectangle.on('mouseenter', function () {
            stage.container().style.cursor = 'pointer';
          });

          rectangle.on('mouseleave', function () {
            stage.container().style.cursor = 'default';
          });

          rectangle.on('dragstart', (e) => {
            shadowRectangle.show();
            shadowRectangle.moveToTop();
            imageContainer.moveToTop();
            rectangle.moveToTop();
            imageColorContainer.moveToTop();
            textHeight.moveToTop();
            textWidth.moveToTop();
            line.moveToTop();
            deleteRect.moveToTop();
            line1Delete.moveToTop();
            line2Delete.moveToTop();
          });

          rectangle.on('dragmove', (e) => {
            element.dragBoundFunction(e, layer);
            element.updateShadowRectanglePosition(e, shadowRectangle);
            element.updateTextsPositions(textHeight, textWidth, e);
            element.updateLinePosition(line, e);
            element.updateDeleteButtonPosition(
              deleteRect,
              line1Delete,
              line2Delete,
              e
            );
            element.updateImagePosition(imageContainer, e);
            element.updateColorImagePosition(imageColorContainer, e);

            stage.batchDraw();
          });

          rectangle.on('dragend', (e) => {
            rectangle.position({
              x:
                Math.round(rectangle.x() / element.snapWidth) *
                element.snapWidth,
              y:
                Math.round(rectangle.y() / element.snapHeight) *
                element.snapHeight,
            });

            element.updateTextsPositions(textHeight, textWidth, e);
            element.updateLinePosition(line, e);
            element.updateDeleteButtonPosition(
              deleteRect,
              line1Delete,
              line2Delete,
              e
            );
            element.updateImagePosition(imageContainer, e);
            element.updateColorImagePosition(imageColorContainer, e);

            element.addTransformer(
              element,
              tr,
              layer,
              rectangle,
              shadowRectangle,
              textHeight,
              textWidth,
              line,
              deleteRect,
              line1Delete,
              line2Delete,
              imageContainer,
              imageColorContainer
            );

            shadowRectangle.hide();
            tr.show();

            element.removeSiblingCanvas(tr, 'Transformer');
            // setActiveValues(rectangle, imageContainer, imageColorContainer);
            stage.batchDraw();
          });

          layer.add(shadowRectangle);
          layer.add(imageContainer);
          layer.add(rectangle);
          layer.add(imageColorContainer);
          layer.add(textHeight);
          layer.add(textWidth);
          layer.add(line);
          layer.add(deleteRect);
          layer.add(line1Delete);
          layer.add(line2Delete);
          layer.batchDraw();
        };
        // imageColorObj.src = `${this.selectedColorImgSource}`;
        imageColorObj.src = `./assets/images/Colorado.jpg`;
      };
      imageObj.src = `./assets/images/handleFront1.svg`;
    };

    imageObjRect.src = `./assets/images/white.png`;
  }

  /*Setting values of carousel depending on clicked element*/
  setActiveValues(rectangle, imageContainer, imageColorContainer) {}

  // function getMatchingImage(slickImages, canvasImage) {
  //   let matchingImage;

  //   slickImages.forEach((e) => {
  //     if (
  //       e.src.includes(canvasImage.attrs.imgSource) &&
  //       !e.parentElement.classList.contains('slick-cloned')
  //     )
  //       matchingImage = e;
  //   });

  //   return matchingImage;
  // }

  findActiveTransformer() {
    let transformers = this.stage.find('Transformer');
    let activeTransformer;

    transformers &&
      transformers.forEach((element) => {
        activeTransformer = element.attrs.visible && element;
      });

    return activeTransformer;
  }

  updateImagePosition(imageContainer, e) {
    imageContainer.x(
      e.target.x() + (e.target.width() * e.target.scaleX() - 128) / 2
    );
    imageContainer.y(
      e.target.y() + (e.target.height() * e.target.scaleY()) / 2 - 36
    );
  }

  updateColorImagePosition(imageColorContainer, e) {
    imageColorContainer.x(
      e.target.x() + (e.target.width() * e.target.scaleX() - 40)
    );
    imageColorContainer.y(
      e.target.y() + (e.target.height() * e.target.scaleY() - 40)
    );
  }

  updateDeleteButtonPosition(deleteRect, line1Delete, line2Delete, e) {
    deleteRect.x(e.target.x());
    deleteRect.y(e.target.y());
    line1Delete.points([
      deleteRect.x(),
      deleteRect.y() + deleteRect.height(),
      deleteRect.x() + deleteRect.width(),
      deleteRect.y(),
    ]);
    line2Delete.points([
      deleteRect.x(),
      deleteRect.y(),
      deleteRect.x() + deleteRect.width(),
      deleteRect.y() + deleteRect.height(),
    ]);
  }

  updateShadowRectanglePosition(e, shadowRectangle) {
    shadowRectangle.position({
      x: Math.round(e.target.x() / this.snapWidth) * this.snapWidth,
      y: Math.round(e.target.y() / this.snapHeight) * this.snapHeight,
    });
  }

  dragBoundFunction(e, layer) {
    let newY = e.target.y() < 0 ? 0 : e.target.y();
    let newX = e.target.x();
    if (e.target.x() < layer.x()) {
      newX = layer.x();
    }
    if (
      e.target.x() + e.target.width() * e.target.scaleX() >
      layer.x() + Number(layer.width())
    ) {
      newX = layer.width() - e.target.width() * e.target.scaleX();
    }
    if (
      e.target.y() + e.target.height() * e.target.scaleY() >
      layer.y() + Number(layer.height())
    ) {
      newY = layer.height() - e.target.height() * e.target.scaleY();
    }
    e.target.y(newY);
    e.target.x(newX);
    layer.batchDraw();
  }

  /*Drop external element on Canvas stage*/
  drop(ev) {
    ev.preventDefault();

    let data = ev.dataTransfer.getData('text');
    const [w, h, color, id] = data.split('|');

    //randomID
    // let idNumber = `${id}${uuidv4()}`;

    // this.newRectangle(
    //   this.layer,
    //   this.stage,
    //   idNumber,
    //   this.stage.x() + this.stage.width() / 4,
    //   this.stage.y() + this.stage.height() / 4,
    //   this.snapWidth * 5,
    //   this.snapHeight * 5
    // );

    this.stage.add(this.layer);
  }

  /*TRANSFORMER (used for resizing the element)*/
  addTransformer(
    element,
    tr,
    layer,
    rectangle,
    shadowRectangle,
    textHeight,
    textWidth,
    line,
    deleteRect,
    line1Delete,
    line2Delete,
    imageContainer,
    imageColorContainer
  ) {
    layer.add(tr);
    tr.nodes([rectangle]);
    layer.draw();

    /*EVENT LISTENERS for transformer*/
    rectangle.on('transformstart', function () {});

    rectangle.on('transform', function (e) {
      let newWidth =
        Math.round(
          (rectangle.width() * rectangle.scaleX()) / element.snapWidth
        ) * element.snapWidth;
      let newHeight =
        Math.round(
          (rectangle.height() * rectangle.scaleY()) / element.snapHeight
        ) * element.snapHeight;

      element.setMinMaxLimitation(element, newWidth, newHeight);
      element.transformBoundFunction(e, layer);
      element.updateTextsPositions(textHeight, textWidth, e);
      element.updateText(textHeight, textWidth, newWidth, newHeight);
      element.updateLinePosition(line, e);
      element.updateDeleteButtonPosition(
        deleteRect,
        line1Delete,
        line2Delete,
        e
      );
      element.updateImagePosition(imageContainer, e);
      element.updateColorImagePosition(imageColorContainer, e);
    });

    rectangle.on('transformend', function (e) {
      let newWidth =
        Math.round(
          (rectangle.width() * rectangle.scaleX()) / element.snapWidth
        ) * element.snapWidth;
      let newHeight =
        Math.round(
          (rectangle.height() * rectangle.scaleY()) / element.snapHeight
        ) * element.snapHeight;
      element.setMinMaxLimitation(element, newWidth, newHeight);
      element.snapRectangles(e, element, shadowRectangle, newWidth, newHeight);
      element.updateTextsPositions(textHeight, textWidth, e);
      element.updateText(textHeight, textWidth, newWidth, newHeight);
      element.updateLinePosition(line, e);
      element.updateDeleteButtonPosition(
        deleteRect,
        line1Delete,
        line2Delete,
        e
      );
      element.updateImagePosition(imageContainer, e);
      element.updateColorImagePosition(imageColorContainer, e);
    });
  }

  snapRectangles(e, element, shadowRectangle, newWidth, newHeight) {
    e.target.x(
      Math.round(e.target.x() / element.snapWidth) * element.snapWidth
    );
    e.target.y(
      Math.round(e.target.y() / element.snapHeight) * element.snapHeight
    );
    e.target.scaleX(newWidth / e.target.width());
    e.target.scaleY(newHeight / e.target.height());
    shadowRectangle.width(newWidth);
    shadowRectangle.height(newHeight);
  }

  transformBoundFunction(e, layer) {
    let newScaleX = e.target.scaleX();
    let newScaleY = e.target.scaleY();
    if (e.target.x() + e.target.width() * e.target.scaleX() > layer.width()) {
      newScaleX = (layer.width() - e.target.x()) / e.target.width();
    }
    if (e.target.y() + e.target.height() * e.target.scaleY() > layer.height()) {
      newScaleY = (layer.height() - e.target.y()) / e.target.height();
    }
    if (e.target.x() <= layer.x()) {
      e.target.x(layer.x());
    }
    e.target.scaleX(newScaleX);
    e.target.scaleY(newScaleY);
    layer.batchDraw();
  }

  setMinMaxLimitation(element, width, height) {
    //height - 1 square height < 14

    if (
      height / element.sqHeight -
        this.mainDimensions.height / element.sqNoHeight / element.sqHeight <
      14
    ) {
      element.MIN_HEIGHT = height;
    }
    //width - 1 square width < 14
    if (
      width / element.sqWidth -
        this.mainDimensions.width / element.sqNoWidth / element.sqWidth <
      14
    ) {
      element.MIN_WIDTH = width;
    }
  }

  /*TEXT*/
  updateText(textHeight, textWidth, width, height) {
    textHeight.text('h: ' + Math.round(height / this.sqHeight));
    textWidth.text('w: ' + Math.round(width / this.sqWidth));
    this.layer.batchDraw();
  }

  updateTextsPositions(textHeight, textWidth, e) {
    textHeight.position({
      x: e.target.x() + 5,
      y: e.target.y() + (e.target.height() * e.target.scaleY()) / 2,
    });

    textWidth.position({
      x: e.target.x() + (e.target.width() * e.target.scaleX()) / 2,
      y: e.target.y() + e.target.height() * e.target.scaleY() - 15,
    });
  }

  updateLinePosition(line, e) {
    line.points([
      e.target.x(),
      e.target.y() + e.target.height() * e.target.scaleY(),
      e.target.x() + e.target.width() * e.target.scaleX(),
      e.target.y(),
    ]);
  }

  removeSiblingCanvas(elType, name) {
    let transformers = this.stage.find(name);

    if (transformers) {
      transformers.forEach((element) => {
        if (
          element.attrs.visible === true &&
          element.attrs.id !== elType.attrs.id
        ) {
          element.hide();
        }
      });
    }
  }

  widthRatio: any;
  heightRatio: any;
  sqNoWidth: any;
  sqNoHeight: any;
  sqWidth: any;
  sqHeight: any;

  setWidthHeightByRatio(widthSize, heightSize, previousWidth, previousHeight) {
    if (+heightSize > +widthSize) {
      this.heightRatio = 1;
      this.widthRatio = widthSize / heightSize;
      this.sqNoWidth = Math.round(this.widthRatio * 10);
      this.sqNoHeight = Math.round(this.heightRatio * 10);
    } else {
      this.widthRatio = 1;
      this.heightRatio = heightSize / widthSize;
      this.sqNoHeight = Math.round(this.heightRatio * 10);
      this.sqNoWidth = Math.round(this.widthRatio * 10);
    }

    this.mainDimensions = {
      width: 400 * this.widthRatio,
      height: 400 * this.heightRatio,
    };
    this.styleDimensions = {
      width: `${this.mainDimensions.width}px`,
      height: `${this.mainDimensions.height}px`,
    };
    // this.containerHeight = 400 * heightRatio;
    // containerWidth = 400 * widthRatio;

    // container.style.width = `${containerWidth}px`;
    // container.style.height = `${containerHeight}px`;

    this.sqWidth = this.mainDimensions.width / previousWidth;
    this.sqHeight = this.mainDimensions.height / previousHeight;
    if (this.stage) {
      this.stage.find('#gridLayer').destroy();
      this.stage.width(this.mainDimensions.width);
      this.stage.height(this.mainDimensions.height);

      this.addGridLayer(
        this.mainDimensions.width,
        this.mainDimensions.height,
        20,
        this.sqNoWidth,
        this.sqNoHeight
      );
      this.stage.add(this.layer);

      this.stage.batchDraw();
    }
  }
}

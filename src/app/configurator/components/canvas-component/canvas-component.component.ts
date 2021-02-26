import { Component, OnInit } from '@angular/core';
import { CanvasService } from '../../../core/services/canvas.service';
import { ICanvasStyleDimensions } from '../../../common/models/interfaces/canvas-style.interface';
import { ICanvasDimensions } from '../../../common/models/interfaces/canvas-dimensions.interface';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';
import Konva from 'konva';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-canvas-component',
  templateUrl: './canvas-component.component.html',
  styleUrls: ['./canvas-component.component.scss'],
})
export class CanvasComponentComponent implements OnInit {
  inputDimensions: ICanvasDimensions = { width: 100, height: 100 };
  mainDimensions: ICanvasDimensions = { width: 100, height: 100 };

  inputWidth: number = 100;
  inputHeight: number = 100;
  // styleDimensions: ICanvasStyleDimensions = {
  //   width: `100px`,
  //   height: `100px`,
  // };

  stage: any;
  layer: any;
  stageRectangle: any;
  gridLayer: any;
  snapWidth: number = 10;
  snapHeight: number = 10;
  MIN_WIDTH: number = 14;
  MIN_HEIGHT: number = 14;
  selectedHandleBarImgSource: string | undefined = '';
  selectedColorImgSource: string | undefined = '';

  constructor(
    private canvasService: CanvasService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.stage = new Konva.Stage({
      container: 'konva-canvas',
      width: 300,
      height: 300,
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

    this.addGridLayer(300, 300, 20, 10, 10);

    this.canvasService.getSelectedHandle().subscribe((data) => {
      if (this.stage.find('Transformer').length !== 0) {
        this.updateElementHandlePicture(data);
      } else {
      }
      this.selectedHandleBarImgSource = this.buildImageSource(
        data.imageUrl ? data.imageUrl : ''
      );
    });
    this.canvasService.getSelectedElement().subscribe((data) => {
      this.addNewElement(data);
    });

    this.canvasService.getSelectedColor().subscribe((data) => {
      if (this.stage.find('Transformer').length !== 0) {
        this.updateElementColorPicture(data);
      } else {
      }
      this.selectedColorImgSource = this.buildImageSource(
        data.imageUrl ? data.imageUrl : ''
      );
    });
    this.canvasService.getSelectedTemplate().subscribe((data) => {
      this.setTemplate(data);
    });

    this.stage.batchDraw();

    this.canvasService.getMainWidth().subscribe((data) => {
      this.inputWidth = data;
    });
    this.canvasService.getMainHeight().subscribe((data) => {
      this.inputHeight = data;
    });
    this.setWidthHeightByRatio(this.inputWidth, this.inputHeight);
  }

  setTemplate(data) {
    data.description.includes('TEMPLATE1') && this.sampleTemplate4(this);
    data.description.includes('TEMPLATE2') && this.sampleTemplate2(this);
    data.description.includes('TEMPLATE3') && this.sampleTemplate3(this);
    data.description.includes('TEMPLATE4') && this.sampleTemplate1(this);
  }

  sampleTemplate1(element) {
    this.layer.destroyChildren();

    this.stageRectangle = new Konva.Rect({
      x: this.stage.x(),
      y: this.stage.y(),
      width: this.stage.width(),
      height: this.stage.height(),
      fill: '#ebebeb',
    });
    this.layer.add(this.stageRectangle);
    this.layer.draw();
  }

  sampleTemplate2(element) {
    this.layer.destroyChildren();
    this.layer.draw();
    this.stageRectangle = new Konva.Rect({
      x: this.stage.x(),
      y: this.stage.y(),
      width: this.stage.width(),
      height: this.stage.height(),
      fill: '#ebebeb',
    });
    this.layer.add(this.stageRectangle);

    this.newRectangle(
      element,
      this.layer,
      this.stage,
      uuidv4(),
      this.stage.x(),
      this.stage.y(),
      this.stage.width() / 2,
      this.stage.height()
    );
    this.newRectangle(
      element,
      this.layer,
      this.stage,
      uuidv4(),
      this.stage.x() + this.stage.width() / 2,
      this.stage.y(),
      this.stage.width() / 2,
      this.stage.height()
    );
  }

  sampleTemplate3(element) {
    this.layer.destroyChildren();
    this.layer.draw();
    this.stageRectangle = new Konva.Rect({
      x: this.stage.x(),
      y: this.stage.y(),
      width: this.stage.width(),
      height: this.stage.height(),
      fill: '#ebebeb',
    });
    this.layer.add(this.stageRectangle);

    this.newRectangle(
      element,
      this.layer,
      this.stage,
      uuidv4(),
      this.stage.x(),
      this.stage.y(),
      this.stage.width() / 2,
      this.stage.height()
    );
    this.newRectangle(
      element,
      this.layer,
      this.stage,
      uuidv4(),
      this.stage.x() + this.stage.width() / 2,
      this.stage.y(),
      this.stage.width() / 2,
      this.stage.height() / 2
    );
    this.newRectangle(
      element,
      this.layer,
      this.stage,
      uuidv4(),
      this.stage.x() + this.stage.width() / 2,
      this.stage.y() + this.stage.height() / 2,
      this.stage.width() / 2,
      this.stage.height() / 2
    );
  }

  sampleTemplate4(element) {
    this.layer.destroyChildren();
    this.layer.draw();
    this.stageRectangle = new Konva.Rect({
      x: this.stage.x(),
      y: this.stage.y(),
      width: this.stage.width(),
      height: this.stage.height(),
      fill: '#ebebeb',
    });
    this.layer.add(this.stageRectangle);

    this.newRectangle(
      element,
      this.layer,
      this.stage,
      uuidv4(),
      this.stage.x(),
      this.stage.y(),
      this.stage.width() / 3,
      this.stage.height()
    );
    this.newRectangle(
      element,
      this.layer,
      this.stage,
      uuidv4(),
      this.stage.x() + (this.stage.width() / 3) * 2,
      this.stage.y(),
      this.stage.width() / 3,
      this.stage.height()
    );
    this.newRectangle(
      element,
      this.layer,
      this.stage,
      uuidv4(),
      this.stage.x() + this.stage.width() / 3,
      this.stage.y(),
      this.stage.width() / 3,
      this.stage.height() / 3
    );
    this.newRectangle(
      element,
      this.layer,
      this.stage,
      uuidv4(),
      this.stage.x() + this.stage.width() / 3,
      this.stage.y() + this.stage.height() / 3,
      this.stage.width() / 3,
      this.stage.height() / 3
    );
    this.newRectangle(
      element,
      this.layer,
      this.stage,
      uuidv4(),
      this.stage.x() + this.stage.width() / 3,
      this.stage.y() + (this.stage.height() / 3) * 2,
      this.stage.width() / 3,
      this.stage.height() / 3
    );
  }

  updateElementPicture(data) {}

  updateElementColorPicture(data) {
    let colorUrl = this.buildImageSource(data.imageUrl);
    let transformers = this.stage.find('Transformer');
    let activeTransformer;
    transformers.forEach((element) => {
      element.attrs.visible == true && (activeTransformer = element);
    });

    if (activeTransformer) {
      let id = activeTransformer.attrs.id;
      let currentImage = this.stage.find(`.colorImage${id}`);

      if (currentImage) {
        var imageObj2 = new Image();
        imageObj2.src = `${colorUrl}`;
        imageObj2.onload = function () {
          currentImage.image(imageObj2);

          //Setting new imgSource attribute so i can compare them to carousel images
          if (currentImage[0]) {
            currentImage[0].attrs.imgSource = `${colorUrl}`;
          }
        };
      }

      this.stage.batchDraw();
    }
  }

  updateElementHandlePicture(data) {
    let handleUrl = this.buildImageSource(data.imageUrl);
    let transformers = this.stage.find('Transformer');
    let activeTransformer;
    transformers.forEach((element) => {
      element.attrs.visible == true && (activeTransformer = element);
    });

    if (activeTransformer) {
      let id = activeTransformer.attrs.id;
      let currentImage = this.stage.find(`.handleBarImage${id}`);

      if (currentImage) {
        var imageObj2 = new Image();
        imageObj2.src = `${handleUrl}`;
        imageObj2.onload = function () {
          currentImage.image(imageObj2);

          //Setting new imgSource attribute so i can compare them to carousel images
          if (currentImage[0]) {
            currentImage[0].attrs.imgSource = `${handleUrl}`;
          }
        };
      }

      this.stage.batchDraw();
    }
  }

  addNewElement(data) {
    let id = data.description.includes('DOOR')
      ? `door${uuidv4()}`
      : `drawer${uuidv4()}`;

    this.newRectangle(
      this,
      this.layer,
      this.stage,
      id,
      this.stage.x(),
      this.stage.y(),
      this.stage.x() + this.snapWidth * 4,
      this.stage.y() + this.snapWidth * 5
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
          opacity: 0.5,
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
          opacity: 0.5,
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
        width: rectWidth,
        height: rectHeight,
        draggable: true,
        stroke: 'black',
        borderColor: 'black',
        borderSize: 1,
        strokeWidth: 1,
        shadowColor: 'black',
        shadowBlur: 2,
        opacity: 0.4,
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
          imgSource: `${element.selectedHandleBarImgSource}`,
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
            imgSource: `${element.selectedColorImgSource}`,
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
            fill: 'black',
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
            visible: false,
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

            tr.attrs.visible == true ? tr.hide() : tr.show(),
              element.setActiveValues(
                rectangle,
                imageContainer,
                imageColorContainer
              );

            element.sendImageSources(imageColorContainer, imageContainer, id);

            element.removeSiblingCanvas(tr, 'Transformer');

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
        imageColorObj.src = `${element.selectedColorImgSource}`;
      };
      imageObj.src = `${element.selectedHandleBarImgSource} `;
    };

    imageObjRect.src = `./assets/images/white.png`;
  }

  sendImageSources(colorImage, handleImage, id) {
    this.canvasService.setActiveCanvasElementSource(colorImage.attrs.imgSource);
    this.canvasService.setActiveCanvasElementSource(
      handleImage.attrs.imgSource
    );
    this.canvasService.setActiveCanvasElementSource(id.toUpperCase());
    // console.log(handleImage);
    // console.log(colorImage);
  }

  /*Setting values of carousel depending on clicked element*/
  setActiveValues(rectangle, imageContainer, imageColorContainer) {
    let transformer = this.stage.find(`.transformer${rectangle.attrs.id}`);

    let elementHandleImage = this.stage.find(
      `.handleBarImage${rectangle.attrs.id}`
    );

    let elementColorImage = this.stage.find(`.colorImage${rectangle.attrs.id}`);

    // this.canvasService.setActiveCanvasElementSource(
    //   elementColorImage[0].attrs.image.attributes[0].value
    // );

    // //door and drawer elements
    // let elements = getDocElements(".drawer-con img");

    // elements.forEach((el) => {
    //   transformer[0].attrs.id.includes(`${el.id}`) &&
    //     setActiveElement(el, transformer[0]);
    // });

    // //handle bars elements

    // let handles = getDocElements(".slick2  div");
    // let handleImages = getDocElements(".slick2 img");

    // if (transformer[0].attrs.visible === true) {
    //   let currentSlide = getCurrentSlide("slick2", handles);
    //   let matchingSlide;

    //   //If current slide image is not canvas element image
    //   if (
    //     !currentSlide.children[1].src.includes(imageContainer.attrs.imgSource)
    //   ) {
    //     matchingSlide = getMatchingImage(handleImages, imageContainer)
    //       .parentElement;

    //     //move to matching slide
    //     $(".slick2").slick("slickGoTo", matchingSlide.dataset.slickIndex, false);
    //   }
  }

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

  private buildImageSource(imageUrl: string) {
    return imageUrl.length > 0
      ? `./${this.translateService.instant(imageUrl)} `
      : '';
  }

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
      shadowRectangle.hide();
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

  setWidthHeightByRatio(widthSize, heightSize) {
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

    // input dimensions
    this.inputDimensions = {
      width: widthSize,
      height: heightSize,
    };

    //stage
    this.mainDimensions = {
      width: 600 * this.widthRatio,
      height: 600 * this.heightRatio,
    };

    // console.log(this.mainDimensions);
    //container
    // this.styleDimensions = {
    //   width: `${400 * this.widthRatio}px`,
    //   height: `${400 * this.heightRatio}px`,
    // };
    // // this.containerHeight = 400 * heightRatio;
    // // containerWidth = 400 * widthRatio;
    // // container.style.width = `${containerWidth}px`;
    // // container.style.height = `${containerHeight}px`;

    this.sqWidth = this.mainDimensions.width / widthSize;
    this.sqHeight = this.mainDimensions.height / heightSize;
    if (this.stage) {
      this.stage.find('#gridLayer').destroy();
      this.stage.width(this.mainDimensions.width);
      this.stage.height(this.mainDimensions.height);

      this.stageRectangle.width(this.mainDimensions.width);
      this.stageRectangle.height(this.mainDimensions.height);
      this.stage.add(this.layer);
      this.layer.add(this.stageRectangle);
      this.addGridLayer(
        this.mainDimensions.width,
        this.mainDimensions.height,
        20,
        this.sqNoWidth,
        this.sqNoHeight
      );
      this.stage.batchDraw();
    }
  }
}

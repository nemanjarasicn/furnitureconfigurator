import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { IConfigurationGroup } from 'src/app/common/models/interfaces/configuration-group.interface';
import { CanvasService } from '../../../core/services/canvas.service';

@Component({
  selector: 'app-configuration-group',
  templateUrl: './configuration-group.component.html',
  styleUrls: ['./configuration-group.component.scss'],
})
export class ConfigurationGroupComponent implements OnInit {
  @Input()
  group!: IConfigurationGroup;
  isCanvas: boolean = false;

  constructor(private canvasService: CanvasService) {}

  ngOnInit(): void {
    this.canvasService.getCanvasState().subscribe((data) => {
      this.isCanvas = data;
    });
  }

  showCanvas() {
    this.canvasService.setCanvasTrue();
  }
  hideCanvas() {
    this.canvasService.setCanvasFalse();
  }
}

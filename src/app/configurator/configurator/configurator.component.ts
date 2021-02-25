import { Component, OnInit, HostListener } from '@angular/core';
import { ConfigurationConstants } from 'src/app/common/constants/configuration.constants';
import { IConfigurationGroup } from 'src/app/common/models/interfaces/configuration-group.interface';
import { CanvasService } from '../../core/services/canvas.service';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss'],
})
export class ConfiguratorComponent implements OnInit {
  isCanvas: boolean = false;
  x: number = 0;
  y: number = 0;

  constructor(private canvasService: CanvasService) {}

  configuratorForm: IConfigurationGroup[] =
    ConfigurationConstants.CONFIGURATION_FORM;

  ngOnInit(): void {
    this.canvasService.getCanvasState().subscribe((data) => {
      this.isCanvas = data;
    });
  }

  onScroll(e) {
    // console.log('scrolling');
  }

  // @HostListener('mouseenter', ['$event'])
  // onMouseEnter(event: KeyboardEvent) {
  //   console.log('wheel');
  // }
}

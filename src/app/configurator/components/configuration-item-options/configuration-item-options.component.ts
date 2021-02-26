import { Component, Input, OnInit, HostListener } from '@angular/core';
import { ConfigurationOptionType } from 'src/app/common/enums/configuration-option-type.enum';
import { IConfigurationItemOption } from 'src/app/common/models/interfaces/configuration-item-option.interface';
import { IConfigurationItem } from 'src/app/common/models/interfaces/configuration-item.interface';
import { ConfigurationService } from 'src/app/core/services/configuration.service';
import { CanvasService } from 'src/app/core/services/canvas.service';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'src/app/core/services/cookie.service';

@Component({
  selector: 'app-configuration-item-options',
  templateUrl: './configuration-item-options.component.html',
  styleUrls: ['./configuration-item-options.component.scss'],
})
export class ConfigurationItemOptionsComponent implements OnInit {
  @Input() options!: IConfigurationItemOption[];
  @Input() item!: IConfigurationItem;
  @Input() optionsType!: ConfigurationOptionType;
  @Input() setInitialActiveValue: boolean = false;
  activeOption: IConfigurationItemOption | undefined;

  optionTypeTile = ConfigurationOptionType.TILE;
  optionTypeInput = ConfigurationOptionType.INPUT;

  constructor(
    private configurationService: ConfigurationService,
    private canvasService: CanvasService,
    private translateService: TranslateService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    //For Scrolling
    this.canvasService.getHoveredItem().subscribe((data) => {
      if (data === this.item! && !this.activeOption) {
        this.activeOption = data.options[0];

        data.options[0].type === 'canvas'
          ? (this.canvasService.setSelectedOption(data.options[0]),
            this.canvasService.setCanvasTrue())
          : (this.configurationService.selectOption(this.item, data.options[0]),
            this.canvasService.setCanvasFalse());
      } else if (data === this.item! && this.activeOption) {
        data.options[0].type === 'canvas'
          ? this.canvasService.setCanvasTrue()
          : this.canvasService.setCanvasFalse();
      }
    });

    //For updating images on canvas elements
    this.canvasService.getActiveCanvasElementSource().subscribe((data) => {
      this.options.forEach((e) => {
        if (this.buildImageSource(e.imageUrl ? e.imageUrl : '') === data) {
          this.activeOption = e;
        }

        if (e.imageUrl?.includes('DOOR') && data.includes('DOOR')) {
          this.activeOption = e;
        }
        if (e.imageUrl?.includes('DRAWER') && data.includes('DRAWER')) {
          this.activeOption = e;
        }
      });
    });
  }

  onTileSelected(selectedOption: IConfigurationItemOption) {
    if (this.activeOption !== selectedOption) {
      this.activeOption = selectedOption;
      selectedOption.type === 'canvas'
        ? this.canvasService.setSelectedOption(selectedOption)
        : this.configurationService.selectOption(this.item, selectedOption);
    }
  }

  buildImageSource(imageUrl: string) {
    return imageUrl.length > 0
      ? `./${this.translateService.instant(imageUrl)} `
      : '';
  }
}

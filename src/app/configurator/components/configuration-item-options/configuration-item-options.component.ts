import { Component, Input, OnInit, HostListener } from '@angular/core';
import { ConfigurationOptionType } from 'src/app/common/enums/configuration-option-type.enum';
import { IConfigurationItemOption } from 'src/app/common/models/interfaces/configuration-item-option.interface';
import { IConfigurationItem } from 'src/app/common/models/interfaces/configuration-item.interface';
import { ConfigurationService } from 'src/app/core/services/configuration.service';
import { CanvasService } from 'src/app/core/services/canvas.service';

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
    private canvasService: CanvasService
  ) {}

  ngOnInit(): void {
    this.canvasService.getHoveredItem().subscribe((data) => {
      if (data === this.item! && !this.activeOption) {
        this.activeOption = data.options[0];

        data.options[0].type === 'canvas'
          ? (this.canvasService.setSelectedOption(data.options[0]),
            this.canvasService.setCanvasTrue())
          : (this.configurationService.selectOption(this.item, data.options[0]),
            this.canvasService.setCanvasFalse());
      }
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
}

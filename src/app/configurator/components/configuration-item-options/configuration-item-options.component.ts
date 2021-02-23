import { Component, Input, OnInit } from '@angular/core';
import { ConfigurationOptionType } from 'src/app/common/enums/configuration-option-type.enum';
import { IConfigurationItemOption } from 'src/app/common/models/interfaces/configuration-item-option.interface';
import { IConfigurationItem } from 'src/app/common/models/interfaces/configuration-item.interface';
import { ConfigurationService } from 'src/app/core/services/configuration.service';

@Component({
  selector: 'app-configuration-item-options',
  templateUrl: './configuration-item-options.component.html',
  styleUrls: ['./configuration-item-options.component.scss'],
})
export class ConfigurationItemOptionsComponent implements OnInit {
  @Input() options!: IConfigurationItemOption[];
  @Input() item!: IConfigurationItem;
  @Input() optionsType!: ConfigurationOptionType;

  activeOption: IConfigurationItemOption | undefined;

  optionTypeTile = ConfigurationOptionType.TILE;
  optionTypeInput = ConfigurationOptionType.INPUT;

  constructor(private configurationService: ConfigurationService) {}

  ngOnInit(): void {}

  onTileSelected(selectedOption: IConfigurationItemOption) {
    //Check if it is canvas element
    if (selectedOption.type !== 'canvas') {
      if (this.activeOption !== selectedOption) {
        this.activeOption = selectedOption;
        this.configurationService.selectOption(this.item, selectedOption);
      }
    } else {
      console.log('jesteCanvas');
    }
  }
}

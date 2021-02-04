import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ConfigurationConstants } from 'src/app/common/constants/configuration.constants';

import { IConfigurationItemOption } from 'src/app/common/models/interfaces/configuration-item-option.interface';

@Component({
  selector: 'app-option-tile',
  templateUrl: './option-tile.component.html',
  styleUrls: ['./option-tile.component.scss']
})
export class OptionTileComponent implements OnInit {

  @Input() option!: IConfigurationItemOption
  @Input() isActive: boolean = false;
  @Input() tileSize: number | undefined;
  @Output() tileSelected: EventEmitter<IConfigurationItemOption> = new EventEmitter<IConfigurationItemOption>();

  size!: number;

  constructor() { }

  ngOnInit(): void {
    this.size = this.tileSize || ConfigurationConstants.DEFAULT_TILE_SIZE_PX
  }

  onSelectOption() {
    this.tileSelected.emit(this.option);
  }

}

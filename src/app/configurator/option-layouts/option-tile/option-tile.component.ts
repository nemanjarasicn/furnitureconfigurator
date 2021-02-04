import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { IConfigurationItemOption } from 'src/app/common/models/interfaces/configuration-item-option.interface';

@Component({
  selector: 'app-option-tile',
  templateUrl: './option-tile.component.html',
  styleUrls: ['./option-tile.component.scss']
})
export class OptionTileComponent implements OnInit {

  @Input() option!: IConfigurationItemOption
  @Output() tileSelected: EventEmitter<IConfigurationItemOption> = new EventEmitter<IConfigurationItemOption>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectOption() {
    this.tileSelected.emit(this.option);
  }

}

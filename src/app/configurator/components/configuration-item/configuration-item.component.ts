import { Component, Input, OnInit } from '@angular/core';
import { IConfigurationItem } from 'src/app/common/models/interfaces/configuration-item.interface';

@Component({
  selector: 'app-configuration-item',
  templateUrl: './configuration-item.component.html',
  styleUrls: ['./configuration-item.component.scss']
})
export class ConfigurationItemComponent implements OnInit {

  @Input()
  item!: IConfigurationItem;

  constructor() { }

  ngOnInit(): void {
  }

}

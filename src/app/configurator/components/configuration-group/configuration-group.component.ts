import { Component, Input, OnInit } from '@angular/core';
import { IConfigurationGroup } from 'src/app/common/models/interfaces/configuration-group.interface';

@Component({
  selector: 'app-configuration-group',
  templateUrl: './configuration-group.component.html',
  styleUrls: ['./configuration-group.component.scss']
})
export class ConfigurationGroupComponent implements OnInit {

  @Input()
  group!: IConfigurationGroup;

  constructor() { }

  ngOnInit(): void {
  }

}

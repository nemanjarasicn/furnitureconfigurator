import { Component, OnInit } from '@angular/core';
import { ConfigurationConstants } from 'src/app/common/constants/configuration.constants';
import { IConfigurationGroup } from 'src/app/common/models/interfaces/configuration-group.interface';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit {

  constructor() { }

  configuratorForm: IConfigurationGroup[] = ConfigurationConstants.CONFIGURATION_FORM

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { ConfigurationConstants } from 'src/app/common/constants/configuration.constants';
import { IBreadcrumb } from 'src/app/common/models/interfaces/breadcrumb.interface';

@Component({
  selector: 'app-configuration-breadcrumb',
  templateUrl: './configuration-breadcrumb.component.html',
  styleUrls: ['./configuration-breadcrumb.component.scss']
})
export class ConfigurationBreadcrumbComponent implements OnInit {



  breadcrumbs: IBreadcrumb[] = ConfigurationConstants.getConfigurationBreadCrumbs();
  activeAnchor: string = this.breadcrumbs[0].anchor;

  constructor() { }

  ngOnInit(): void {
  }

  onBreadcrumbClick(breadcrumb: IBreadcrumb) {
    this.activeAnchor = breadcrumb.anchor;
  }

}

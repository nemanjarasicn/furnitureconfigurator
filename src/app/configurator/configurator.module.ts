import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { ConfiguratorRoutingModule } from './configurator-routing.module';
import { ConfigurationGroupComponent } from './components/configuration-group/configuration-group.component';
import { SharedModule } from '../shared/shared.module';
import { ConfigurationItemComponent } from './components/configuration-item/configuration-item.component';
import { ConfigurationItemOptionsComponent } from './components/configuration-item-options/configuration-item-options.component';
import { OptionTileComponent } from './option-layouts/option-tile/option-tile.component';
import { ConfigurationPreviewComponent } from './components/configuration-preview/configuration-preview.component';
import { OptionInputComponent } from './option-layouts/option-input/option-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigurationBreadcrumbComponent } from './components/configuration-breadcrumb/configuration-breadcrumb.component';



@NgModule({
  declarations: [ConfiguratorComponent, ConfigurationGroupComponent, ConfigurationItemComponent, ConfigurationItemOptionsComponent, OptionTileComponent, ConfigurationPreviewComponent, OptionInputComponent, ConfigurationBreadcrumbComponent],
  imports: [
    CommonModule,
    ConfiguratorRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ConfiguratorModule { }

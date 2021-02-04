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



@NgModule({
  declarations: [ConfiguratorComponent, ConfigurationGroupComponent, ConfigurationItemComponent, ConfigurationItemOptionsComponent, OptionTileComponent, ConfigurationPreviewComponent],
  imports: [
    CommonModule,
    ConfiguratorRoutingModule,
    SharedModule
  ]
})
export class ConfiguratorModule { }

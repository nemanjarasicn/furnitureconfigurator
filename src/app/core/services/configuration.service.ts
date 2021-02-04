import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigurationOptionType } from 'src/app/common/enums/configuration-option-type.enum';
import { IConfigurationItemOption } from 'src/app/common/models/interfaces/configuration-item-option.interface';
import { IConfigurationItem } from 'src/app/common/models/interfaces/configuration-item.interface';
import { IConfiguratorPreview } from 'src/app/common/models/interfaces/configurator-preview.interface';

@Injectable()
export class ConfigurationService {

  constructor() { }

  private configuratorPreview: BehaviorSubject<IConfiguratorPreview> = new BehaviorSubject<IConfiguratorPreview>({})

  selectOption(optionItem: IConfigurationItem, selectedItemOption: IConfigurationItemOption) {

    if (optionItem.type === ConfigurationOptionType.TILE) {
      this.changeConfiguratorPreview(selectedItemOption.imageUrl, selectedItemOption.description)
    }
  }

  onConfiguratorPreviewChanged(): BehaviorSubject<IConfiguratorPreview> {
    return this.configuratorPreview;
  }

  private changeConfiguratorPreview(image: string | undefined, description: string | undefined) {
    this.configuratorPreview.next({description, image});
  }
}

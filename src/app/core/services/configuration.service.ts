import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigurationOptionType } from 'src/app/common/enums/configuration-option-type.enum';
import { IConfigurationItemOption } from 'src/app/common/models/interfaces/configuration-item-option.interface';
import { IConfigurationItem } from 'src/app/common/models/interfaces/configuration-item.interface';
import { IConfiguratorPreview } from 'src/app/common/models/interfaces/configurator-preview.interface';
import { IProduct } from 'src/app/common/models/interfaces/product.interface';
import { Product } from 'src/app/common/models/product.model';

@Injectable()
export class ConfigurationService {

  private product: IProduct = new Product();
  private product$: BehaviorSubject<IProduct> = new BehaviorSubject<IProduct>(this.product);

  constructor() { }

  private configuratorPreview$: BehaviorSubject<IConfiguratorPreview> = new BehaviorSubject<IConfiguratorPreview>({})

  selectOption(optionItem: IConfigurationItem, selectedItemOption: IConfigurationItemOption) {

    this.publishProductChanges(optionItem, selectedItemOption);

    if (optionItem.type === ConfigurationOptionType.TILE) {
      this.changeConfiguratorPreview(selectedItemOption.imageUrl, selectedItemOption.description)
    }
  }

  onProductChanged(): BehaviorSubject<IProduct> {
    return this.product$;
  }

  onConfiguratorPreviewChanged(): BehaviorSubject<IConfiguratorPreview> {
    return this.configuratorPreview$;
  }

  private publishProductChanges(optionItem: IConfigurationItem, selectedItemOption: IConfigurationItemOption) {
    if (this.product[optionItem.key]?.value !== selectedItemOption.value) {
      this.product[optionItem.key] = selectedItemOption;
      this.product$.next(this.product);
    }
  }

  private changeConfiguratorPreview(image: string | undefined, description: string | undefined) {
    this.configuratorPreview$.next({description, image});
  }
}

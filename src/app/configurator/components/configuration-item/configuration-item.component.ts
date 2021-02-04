import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IConfigurationItemOption } from 'src/app/common/models/interfaces/configuration-item-option.interface';
import { IConfigurationItem } from 'src/app/common/models/interfaces/configuration-item.interface';
import { IProduct } from 'src/app/common/models/interfaces/product.interface';
import { ConfigurationService } from 'src/app/core/services/configuration.service';

@Component({
  selector: 'app-configuration-item',
  templateUrl: './configuration-item.component.html',
  styleUrls: ['./configuration-item.component.scss']
})
export class ConfigurationItemComponent implements OnInit, OnDestroy {

  @Input()
  item!: IConfigurationItem;
  subscription: Subscription = new Subscription();
  isShown: boolean = true;

  constructor(private configurationService: ConfigurationService) { }

  ngOnInit(): void {
    this.subscription = this.configurationService.onProductChanged().subscribe((product: IProduct) => {
      this.performChecks(product)
    })
  }

  private performChecks(product: IProduct) {

    if (this.item.dependsOn) {
      const option: IConfigurationItemOption = product[this.item.dependsOn.key];
      this.isShown = option && option.value ===  this.item.dependsOn.value;
    }

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}

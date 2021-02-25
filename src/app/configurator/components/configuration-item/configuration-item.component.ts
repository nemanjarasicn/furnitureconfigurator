import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  HostListener,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IConfigurationItemOption } from 'src/app/common/models/interfaces/configuration-item-option.interface';
import { IConfigurationItem } from 'src/app/common/models/interfaces/configuration-item.interface';
import { IProduct } from 'src/app/common/models/interfaces/product.interface';
import { ConfigurationService } from 'src/app/core/services/configuration.service';
import { CanvasService } from 'src/app/core/services/canvas.service';

@Component({
  selector: 'app-configuration-item',
  templateUrl: './configuration-item.component.html',
  styleUrls: ['./configuration-item.component.scss'],
})
export class ConfigurationItemComponent implements OnInit, OnDestroy {
  @Input()
  item!: IConfigurationItem;
  subscription: Subscription = new Subscription();
  isShown: boolean | undefined = true;

  constructor(
    private configurationService: ConfigurationService,
    private canvasService: CanvasService
  ) {}

  ngOnInit(): void {
    this.subscription = this.configurationService
      .onProductChanged()
      .subscribe((product: IProduct) => {
        this.performChecks(product);
      });
  }

  private performChecks(product: IProduct) {
    if (this.item.dependsOn) {
      const option: IConfigurationItemOption | undefined =
        product[this.item.dependsOn.key as keyof typeof product]; //some bug appears
      this.isShown = option && option.value === this.item.dependsOn.value;
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: KeyboardEvent) {
    this.canvasService.setHoveredItem(this.item);
  }
}

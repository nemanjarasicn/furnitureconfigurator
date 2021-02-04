import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IConfiguratorPreview } from 'src/app/common/models/interfaces/configurator-preview.interface';
import { ConfigurationService } from 'src/app/core/services/configuration.service';

@Component({
  selector: 'app-configuration-preview',
  templateUrl: './configuration-preview.component.html',
  styleUrls: ['./configuration-preview.component.scss']
})
export class ConfigurationPreviewComponent implements OnInit, OnDestroy {

  backgroundImage: string | undefined;
  description: string | undefined;

  subscription: Subscription | undefined;

  constructor(private translateService: TranslateService, private configurationService: ConfigurationService) { }

  ngOnInit(): void {
    this.subscription = this.configurationService.onConfiguratorPreviewChanged().subscribe((data: IConfiguratorPreview) => {
      this.backgroundImage = this.buildBackGroundImage(data.image || '')
      this.description  = data.description;
    })
  }

  private buildBackGroundImage(imageUrl: string) {
    return imageUrl.length > 0 ? `url(${this.translateService.instant(imageUrl)}) no-repeat center center` : '';
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}

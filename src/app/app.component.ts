import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageConstants } from './common/constants/language.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /**
   *
   */
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(LanguageConstants.DEFAULT_LANGUAGE);
    this.translateService.use(LanguageConstants.DEFAULT_LANGUAGE);
  }

}

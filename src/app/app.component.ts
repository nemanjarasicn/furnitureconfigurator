import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageConstants } from './common/constants/language.constants';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   *
   */

  currentRoute: string = '/';
  constructor(
    private translateService: TranslateService,
    location: Location,
    router: Router
  ) {
    this.translateService.setDefaultLang(LanguageConstants.DEFAULT_LANGUAGE);
    this.translateService.use(LanguageConstants.DEFAULT_LANGUAGE);

    router.events.subscribe((val) => {
      if (location.path() != '') {
        this.currentRoute = location.path();
      } else {
        this.currentRoute = '/';
      }
    });
  }
}

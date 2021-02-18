import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgbComponent } from './pages/agb/agb.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LanguageConstants } from './common/constants/language.constants';
import { HeaderComponent } from './header/header.component';
import { CoreModule } from './core/core.module';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactService } from './core/services/contact.service';
import { AccountComponent } from './pages/account/account.component';
import { CompleteConfigurationComponent } from './pages/complete-configuration/complete-configuration.component';
import { ThanksComponent } from './pages/thanks/thanks.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AgbComponent,
    ContactComponent,
    ImprintComponent,
    HeaderComponent,
    AccountComponent,
    CompleteConfigurationComponent,
    ThanksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: LanguageConstants.DEFAULT_LANGUAGE,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    TooltipModule.forRoot({
      'show-delay': 50,
      'hide-delay': 50,
      placement: 'bottom',
    }),
    CoreModule,
  ],
  providers: [ContactService],
  bootstrap: [AppComponent],
})
export class AppModule {}

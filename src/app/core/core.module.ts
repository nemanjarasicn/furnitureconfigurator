import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationService } from './services/configuration.service';
import { ContactService } from './services/contact.service';
import { CookieService } from './services/cookie.service';
import { AccountService } from './services/account.service';
import { SlideshowService } from './services/slideshow.service';
import { ScrollerService } from './services/scroller.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    ConfigurationService,
    ContactService,
    CookieService,
    AccountService,
    SlideshowService,
    ScrollerService,
  ],
})
export class CoreModule {}

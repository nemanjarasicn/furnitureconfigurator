import { Component, OnInit } from '@angular/core';
import { CookieService } from '../core/services/cookie.service';
import { ApprovedCookie } from '../common/models/interfaces/cookie-approved.interface';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.scss'],
})
export class CookieComponent implements OnInit {
  /* LIST OF COOKIE TYPES */
  /*
    0 - analytically
    1 - advertising
    2 - necessary

    if empty array then user check None checkbox
  */
  approvedCookie: ApprovedCookie = {
    cookie_approved_0: 1,
    cookie_approved_1: 1,
    cookie_approved_2: 1,
    none_approved: 0,
  };

  isHide: boolean = true;
  isCb_ga: boolean = true;
  isCb_al: boolean = true;
  isCb_tr: boolean = true;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.isHide = this.cookieService.checkCookie(
      this.cookieService.cookieKeys.none_approved
    )
      ? true
      : false;
  }

  setApprovedCookies(): void {
    let is: boolean = false;
    const approvedObj: ApprovedCookie = this.approvedCookie;
    for (const key in approvedObj) {
      if (approvedObj[key as keyof typeof approvedObj] === 1) is = true;
    }

    for (const key in approvedObj) {
      this.cookieService.setCookie(
        key,
        `${approvedObj[key as keyof typeof approvedObj]}`,
        this.cookieService.cookieOptions
      );
    }
    this.isHide = !this.isHide;
  }
}

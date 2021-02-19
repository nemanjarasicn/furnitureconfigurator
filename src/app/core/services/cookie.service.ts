import { Injectable } from '@angular/core';
import { CookieOptions } from '../../common/models/interfaces/cookie-options.interface';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  cookieKeys = {
    cookie_approved_0: 'cookie_approved_0',
    cookie_approved_1: 'cookie_approved_1',
    cookie_approved_2: 'cookie_approved_2',
    none_approved: 'none_approved',
    schritt1Btn1: 'schritt1Btn1',
    schritt1Btn2: 'schritt1Btn2',
    schritt2Hohe: 'schritt2Hohe',
    schritt2Tiefe: 'schritt2Tiefe',
    schritt2Breite: 'schritt2Breite',
    schritt3Hohe: 'schritt3Hohe',
    schritt3Tiefe: 'schritt3Tiefe',
    schritt3Breite: 'schritt3Breite',
    schritt3Img: 'schritt3Img',
    schritt3Schubladen: 'schritt3Schubladen',
    schritt3Turen: 'schritt3Turen',
    schritt4Img: 'schritt4Img',
    schritt2Img: 'schritt2Img',
    schritt2ImgID: 'schritt2ImgID',
    schritt1Img: 'schritt1Img',
    schritt1ImgID: 'schritt1ImgID',
    griff: 'griff',
    griffID: 'griffID',
    farbe: 'farbe',
    farbeID: 'farbeID',
    farbe2: 'farbe2',
    farbe2ID: 'farbe2ID',
    farbe3: 'farbe3',
    farbe3ID: 'farbe3ID',
    waschbecken: 'waschbecken',
  };

  cookieOptions: CookieOptions = {
    path: '/',
    secure: true,
    samesite: 'strict',
  };

  constructor() {}

  setCookie(name: string, value: string, moreOpt?: any) {
    let options: CookieOptions = { ...this.cookieOptions, ...moreOpt };

    //if (options.expires instanceof Date) {
    //options.expires = options.expires.toUTCString()
    //}

    if (options.expires === undefined) {
      let d = new Date();
      d.setDate(d.getDate() + 30);
      options.expires = `${d.toUTCString()}`;
    }

    let updatedCookie =
      encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += '; ' + optionKey;
      let optionValue = options[optionKey as keyof typeof options];
      if (optionValue !== true) {
        updatedCookie += '=' + optionValue;
      }
    }

    document.cookie = updatedCookie;
  }

  getCookie(name: string): string | undefined {
    let matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)'
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  deleteCookie(name: string): void {
    this.setCookie(name, '', { ...this.cookieOptions, 'max-age': -1 });
  }

  checkCookie(name: string): boolean {
    return this.getCookie(name) === undefined ? false : true;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  /* LIST OF COOKIE TYPES */
  /*
    0 - analytically
    1 - advertising
    2 - necessary

    if empty array then user check None checkbox
  */
  approvedCookieObj = {
    cookie_approved_0: true,
    cookie_approved_1: true,
    cookie_approved_2: true,
    none_approved: false,
  };

  cookieKeys = {
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

  cookieOptions = {
    path: '/',
    secure: true,
    samesite: 'strict',
  };

  setCookie(name: string, value: string, moreOpt: any) {
    let options = { ...this.cookieOptions, ...moreOpt };
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

  checkCookie(): boolean {
    return this.getCookie('none_approved') === undefined ? false : true;
  }

  /*okayHideCookie(ele) {
  let is = false
  for (const key in approvedObj) {
    if (approvedObj[key] === true) is = true
  }

  if (is === true) {
    for (const key in approvedObj) {
      setCookie(key, approvedObj[key], cookieOptions)
    }
    ele.parentNode.classList.add('hide')
  } else {
    alert('Please, select a minimum 1 option for cookies.')
  }
}*/

  constructor() {}
}

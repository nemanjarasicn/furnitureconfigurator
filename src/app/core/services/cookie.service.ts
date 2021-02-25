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
    num_of_basins: 'num_of_basins',
    sink_type: 'sink_type',
    sink_dimensions_width: 'sink_dimensions_width',
    sink_dimensions_height: 'sink_dimensions_height',
    sink_model: 'sink_model',
    width: 'width',
    height: 'height',
    depth: 'depth',
    color_consists: 'color_consists',
    color_front: 'color_front',
    color_cover_plate: 'color_cover_plate',
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
}

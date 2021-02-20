import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class ScrollerService {
  constructor() {}

  scroll(scrollIndex: number): any {
    $('html, body').animate(
      {
        scrollTop: $('#scrollTo-' + scrollIndex).offset().top,
      },
      800
    );
  }
}

import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CookieService } from '../../core/services/cookie.service';
import { SlideshowService } from '../../core/services/slideshow.service';
import { ScrollerService } from '../../core/services/scroller.service';
import { SlideShow } from '../../common/models/interfaces/homepage-slideshow.interface';

import * as $ from 'jquery';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  //slider
  slideShow1: SlideShow;
  slideShow2: SlideShow;
  isWaschbecken0Active: boolean = true;
  isSlide_text_container: boolean = false;
  isSTCbtnIcon: boolean = false;

  //scroller
  scrollIndex: number = 0;
  lastScrollTop: number = 0;
  showScroller = true;
  //isFreeToScroll: boolean = true;

  @HostListener('keydown.arrowup', ['$event'])
  onUpArrow(event: KeyboardEvent) {
    console.log('up');
    if (this.isNotMobile()) {
      this.scrollUp();
    }
  }

  @HostListener('keydown.arrowdown', ['$event'])
  onDownArrow(event: KeyboardEvent) {
    console.log('down');
    if (this.isNotMobile()) {
      this.scrollDown();
    }
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: KeyboardEvent) {
    if (this.isNotMobile()) {
      const delta = Math.sign(event['deltaY']);
      if (delta > 0) this.scrollDown();
      else if (delta < 0) this.scrollUp();
    }
  }

  constructor(
    private cookieService: CookieService,
    private slideshowService: SlideshowService,
    private scrollerService: ScrollerService,
    @Inject(DOCUMENT) private document: any
  ) {
    this.slideShow1 = {
      toRight: '.to-right1',
      toLeft: '.to-left1',
      bottom_buttons: '.slide_buttons1',
      slider: '.slider1',
    };
    this.slideShow2 = {
      toRight: '.to-right2',
      toLeft: '.to-left2',
      bottom_buttons: '.slide_buttons2',
      slider: '.slider2',
    };
  }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';

    const y = window.pageYOffset;

    if (y <= $('#scrollTo-0').offset().top) {
      this.scrollIndex = 0;
    } else if (y <= $('#scrollTo-1').offset().top) {
      this.scrollIndex = 0;
    } else if (y <= $('#scrollTo-2').offset().top) {
      this.scrollIndex = 2;
    } else if (y <= $('#scrollTo-3').offset().top) {
      this.scrollIndex = 3;
    } else if (y <= $('#scrollTo-4').offset().top) {
      this.scrollIndex = 4;
    } else if (y <= $('#scrollTo-5').offset().top) {
      this.scrollIndex = 5;
    }

    this.showScroller = this.isNotMobile() ? true : false;
    this.slideshowService.startSlider({ slideShow: this.slideShow1 });
    this.slideshowService.startSlider({
      sliderText: '.slider-text-container p',
      slideShow: this.slideShow2,
    });
  }

  scrollArrow(condition: number, reset: number): void {
    if (this.scrollIndex !== condition) {
      this.scrollerService.scroll(this.scrollIndex);
    } else this.scrollIndex = reset;
  }

  scrollUp(): void {
    this.scrollIndex--;
    if (this.scrollIndex === 1) this.scrollIndex = 0;
    this.scrollArrow(-1, 0);
  }

  scrollDown(): void {
    this.scrollIndex++;
    if (this.scrollIndex === 1) this.scrollIndex = 2;
    this.scrollArrow(6, 5);
  }

  scrollToFun(value: number): void {
    this.scrollIndex = value;
    this.scrollerService.scroll(this.scrollIndex);
  }

  toggleBtnWaschbecken(num: 0 | 1) {
    this.cookieService.setCookie(
      this.cookieService.cookieKeys.waschbecken,
      num.toString()
    );
    this.isWaschbecken0Active = num === 0 ? true : false;
  }

  toggleReadMore(): void {
    const value: number = this.isSlide_text_container ? 4 : 5;
    this.scrollToFun(value);
    this.isSlide_text_container = !this.isSlide_text_container;
    this.isSTCbtnIcon = !this.isSTCbtnIcon;
  }

  isNotMobile() {
    return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
}

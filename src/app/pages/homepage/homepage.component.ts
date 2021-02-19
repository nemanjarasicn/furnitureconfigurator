import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../core/services/cookie.service';
import { SlideshowService } from '../../core/services/slideshow.service';
import { SlideShow } from '../../common/models/interfaces/homepage-slideshow.interface';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  slideShow1: SlideShow;
  slideShow2: SlideShow;
  isWaschbecken0Active: boolean = true;
  isSlide_text_container: boolean = false;
  isSTCbtnIcon: boolean = false;

  showScroller = true;
  constructor(
    private cookieService: CookieService,
    private slideshowService: SlideshowService
  ) {
    this.slideShow1 = {
      toRight: '.to-right1',
      toLeft: '.to-left1',
      bottom_buttons: '.slide_buttons1',
      slider: '.slider1',
      start: null, //this.slideshowService.startSlider,
    };
    this.slideShow2 = {
      toRight: '.to-right2',
      toLeft: '.to-left2',
      bottom_buttons: '.slide_buttons2',
      slider: '.slider2',
      start: null, //this.slideshowService.startSlider,
    };
  }

  ngOnInit(): void {
    this.showScroller = this.isNotMobile() ? true : false;
    //this.slideShow1.start();
    //this.slideShow2.start({ sliderText: '.slider-text-container p' });
  }

  toggleBtnWaschbecken(num: 0 | 1) {
    this.cookieService.setCookie(
      this.cookieService.cookieKeys.waschbecken,
      num.toString()
    );
    this.isWaschbecken0Active = num === 0 ? true : false;
  }

  toggleReadMore(): void {
    if (this.isSlide_text_container) {
      //getDocElement('.nav-div-scroll-con a[scrollTo = "4"]').click();
    } else {
      //getDocElement('.nav-div-scroll-con a[scrollTo = "5"]').click();
    }

    this.isSlide_text_container = !this.isSlide_text_container;
    this.isSTCbtnIcon = !this.isSTCbtnIcon;
  }

  isNotMobile() {
    return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
}

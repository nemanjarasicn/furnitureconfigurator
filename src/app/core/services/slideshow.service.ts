import { Injectable, Inject } from '@angular/core';
import * as $ from 'jquery';
import { DOCUMENT } from '@angular/common';
import { SlideShow } from '../../common/models/interfaces/homepage-slideshow.interface';
@Injectable({
  providedIn: 'root',
})
export class SlideshowService {
  constructor(@Inject(DOCUMENT) private document: any) {}

  //img-slider
  freeToMove_stepSlider: boolean = true;

  startSlider({
    cIndex = 0,
    sliderText = undefined,
    slideShow,
  }: {
    cIndex?: number;
    sliderText?: string | undefined;
    slideShow: SlideShow;
  }) {
    //swipe
    let swiper = {
      touchStartX: 0,
      touchEndX: 0,
      minSwipePixels: 30,
      detectionZone: undefined,
      swiperCallback: function (ret: any) {},

      init: function (detectionZone, callback) {
        swiper.swiperCallback = callback;
        detectionZone.addEventListener(
          'touchstart',
          function (event) {
            swiper.touchStartX = event.changedTouches[0].screenX;
          },
          false
        );
        detectionZone.addEventListener(
          'touchend',
          function (event) {
            swiper.touchEndX = event.changedTouches[0].screenX;
            swiper.handleSwipeGesture();
          },
          false
        );
      },

      handleSwipeGesture: function () {
        let direction, moved;
        if (swiper.touchEndX <= swiper.touchStartX) {
          moved = swiper.touchStartX - swiper.touchEndX;
          direction = 'left';
        }
        if (swiper.touchEndX >= swiper.touchStartX) {
          moved = swiper.touchEndX - swiper.touchStartX;
          direction = 'right';
        }
        if (moved > swiper.minSwipePixels && direction !== 'undefined') {
          swiper.swipe(direction, moved);
        }
      },

      swipe: function (direction, movedPixels) {
        let ret: any = {};
        ret.direction = direction;
        ret.movedPixels = movedPixels;
        swiper.swiperCallback(ret);
      },
    };

    const slideButtons = slideShow.bottom_buttons;
    const leftBtn = slideShow.toLeft;
    const rightBtn = slideShow.toRight;
    let $this = $(slideShow.slider);
    let $group =
      slideButtons === '.slide_buttons_steps'
        ? $this.find('.slide_group_step')
        : $this.find('.slide_group');
    let $slides =
      slideButtons === '.slide_buttons_steps'
        ? $this.find('.step')
        : $this.find('.slide');
    let bulletArray: any = [];
    let currentIndex: number = cIndex;
    // let timeout

    if (slideButtons !== '.slide_buttons_steps') {
      let gestureZone = this.document.querySelector(
        slideShow.slider + ' .slide_group'
      );
      swiper.init(gestureZone, function (e) {
        //console.log(e)
        if (e.direction === 'left') $(rightBtn).click();
        else if (e.direction === 'right') $(leftBtn).click();
      });
    }

    //init active images
    if (slideButtons === '.slide_buttons_steps')
      this.document.querySelectorAll(slideShow.slider + ' div.step')[
        currentIndex
      ].style.visibility = 'unset';
    else
      this.document.querySelectorAll(slideShow.slider + ' .bgImg')[
        currentIndex
      ].style.display = 'block';

    const move = (newIndex) => {
      this.freeToMove_stepSlider = false;
      let animateLeft, slideLeft;

      //advance()

      if ($group.is(':animated') || currentIndex === newIndex) {
        return;
      }

      //console.log('newIndex: ', newIndex)
      //console.log('bulletArray: ', bulletArray)

      bulletArray[currentIndex].removeClass('active');
      bulletArray[newIndex].addClass('active');

      if (sliderText !== undefined) {
        this.document
          .querySelector(sliderText + '.active')
          .classList.remove('active');
        this.document
          .querySelector(sliderText + '#slider-text-' + newIndex)
          .classList.add('active');
      }

      if (newIndex > currentIndex) {
        slideLeft = '100%';
        animateLeft = '-100%';
      } else {
        slideLeft = '-100%';
        animateLeft = '100%';
      }

      if (slideButtons === '.slide_buttons_steps') {
        $slides.eq(newIndex).css({
          visibility: 'unset',
          left: slideLeft,
        });
      } else {
        $slides.eq(newIndex).css({
          display: 'block',
          left: slideLeft,
        });
      }

      if (slideButtons === '.slide_buttons_steps') {
        $slides.eq(currentIndex).css({
          visibility: 'hidden',
        });
      }

      $group.animate(
        {
          left: animateLeft,
        },
        () => {
          if (slideButtons !== '.slide_buttons_steps') {
            $slides.eq(currentIndex).css({
              display: 'none',
            });
          }

          $slides.eq(newIndex).css({
            left: 0,
          });
          $group.css({
            left: 0,
          });
          currentIndex = newIndex;

          this.freeToMove_stepSlider = true;
        }
      );
    };

    // function advance() {
    //   clearTimeout(timeout)
    //   timeout = setTimeout(function () {
    //     if (currentIndex < $slides.length - 1) {
    //       move(currentIndex + 1)
    //     } else {
    //       move(0)
    //     }
    //   }, 3000)
    // }

    $(rightBtn).on('click', function () {
      if (currentIndex > 1 && slideButtons === '.slide_buttons_steps') {
        console.log('prevent slide');
      } else {
        if (currentIndex < $slides.length - 1) {
          move(currentIndex + 1);
        } else {
          move(0);
        }
      }
    });

    $(leftBtn).on('click', function () {
      if (currentIndex !== 0) {
        move(currentIndex - 1);
      } else {
        move($slides.length - 1);
      }
    });

    $.each($slides, function (index) {
      let $button = $('<a class="slide_btn"></a>');

      if (index === currentIndex) {
        $button.addClass('active');
      }
      $button.on('click', function () {
        move(index);
      });

      $(slideButtons).append($button);
      bulletArray.push($button);
    });
    //advance()
  }
}

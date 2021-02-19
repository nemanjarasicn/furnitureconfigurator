import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.scss'],
})
export class ScrollerComponent implements OnInit {
  @Input() isNotMobile: any;

  scrollIndex: number = 0;
  lastScrollTop: number = 0;
  isFree: boolean = true;
  constructor() {}

  @HostListener('keydown.ArrowUp', ['$event'])
  onUpArrow(event: KeyboardEvent) {
    if (this.isNotMobile()) {
      this.scrollUp();
    }
  }

  @HostListener('keydown.ArrowDown', ['$event'])
  onDownArrow(event: KeyboardEvent) {
    if (this.isNotMobile()) {
      this.scrollDown();
    }
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: KeyboardEvent) {
    if (this.isNotMobile()) {
      const delta = Math.sign(event['deltaY']);
      if (delta > 0 && this.isFree) this.scrollDown();
      else if (delta < 0 && this.isFree) this.scrollUp();
    }
  }

  ngOnInit(): void {}

  scroll(): void {
    /*$('html, body').animate(
      {
        scrollTop: $('#scrollTo-' + this.scrollIndex).offset().top,
      },
      800,
      () => {
        this.isFree = true;
      }
    );*/

    this.isFree = true;
    console.log(this.scrollIndex);
  }

  scrollArrow(condition: number, reset: number): void {
    if (this.scrollIndex !== condition) {
      this.isFree = false;
      this.scroll();
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
    this.isFree = false;
    this.scrollIndex = value;
    this.scroll();
  }
}

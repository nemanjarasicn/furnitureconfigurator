import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScrollerService } from '../../../../core/services/scroller.service';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.scss'],
})
export class ScrollerComponent implements OnInit {
  @Input() scrollUp: any;
  @Input() scrollDown: any;
  @Input() scrollToFun: any;
  @Input() scrollArrow: any;
  @Input() isFreeToScroll!: boolean;
  @Input() scrollIndex!: number;
  @Output() scrollIndexChange = new EventEmitter<number>();

  constructor(private scrollerService: ScrollerService) {}

  ngOnInit(): void {}

  scrollUpParent(): void {
    this.scrollUp();
    this.scrollIndexChange.emit(this.scrollIndex);
  }
  scrollDownParent(): void {
    this.scrollDown();
    this.scrollIndexChange.emit(this.scrollIndex);
  }
  scrollToFunParent(num: number): void {
    this.scrollToFun(num);
    this.scrollIndexChange.emit(this.scrollIndex);
  }
}

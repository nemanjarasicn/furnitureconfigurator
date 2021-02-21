import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-agb',
  templateUrl: './agb.component.html',
  styleUrls: ['./agb.component.scss'],
})
export class AgbComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: any) {}

  ngOnInit(): void {
    document.body.style.overflow = 'auto';
  }
}

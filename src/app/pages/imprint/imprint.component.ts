import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss'],
})
export class ImprintComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: any) {}

  ngOnInit(): void {
    document.body.style.overflow = 'auto';
  }
}

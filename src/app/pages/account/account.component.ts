import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(@Inject(DOCUMENT) private document: any) {}

  ngOnInit(): void {
    document.body.style.overflow = 'auto';
  }
}

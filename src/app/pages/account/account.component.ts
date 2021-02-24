import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { User } from 'src/app/common/models/interfaces/user.interface';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  user!: User | null;
  isLogged!: boolean;

  private doAfterCheckIsUserLoggedIn(res): void {
    if (res !== false) {
      this.user = res;
      this.isLogged = true;
    } else {
      this.user = null;
      this.isLogged = false;
    }
  }

  constructor(
    @Inject(DOCUMENT) private document: any,
    private accountService: AccountService
  ) {
    this.accountService.isUserLoggedIn().subscribe((res) => {
      this.doAfterCheckIsUserLoggedIn(res);
    });
  }

  ngOnInit(): void {
    document.body.style.overflow = 'auto';
  }

  isLoggedChanged(event: boolean) {
    this.isLogged = event;
    if (event === false) this.user = null;
    else
      this.accountService.isUserLoggedIn().subscribe((res) => {
        this.doAfterCheckIsUserLoggedIn(res);
      });
  }
}

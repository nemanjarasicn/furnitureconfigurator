import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from '../../../../core/services/account.service';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.scss'],
})
export class AccountLoginComponent implements OnInit {
  frmLogin: FormGroup = new FormGroup({
    l_email: new FormControl(''),
    l_password: new FormControl(''),
  });

  login_errMsg: string = '';

  @Output() loggedChanged = new EventEmitter<boolean>();

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  frmLoginSubmit(): void {
    this.accountService
      .login(
        this.frmLogin.controls.l_email.value,
        this.frmLogin.controls.l_pass.value
      )
      .subscribe((res) => {
        if (res[0] === true) {
          this.loggedChanged.emit(true);
        } else {
          if (res[1] !== undefined) this.login_errMsg = res[1];
        }
      });
  }
}

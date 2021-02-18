import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor() {}

  ngOnInit(): void {}

  frmLoginSubmit(): void {
    console.log(true);
  }
}

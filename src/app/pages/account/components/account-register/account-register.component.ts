import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.scss'],
})
export class AccountRegisterComponent implements OnInit {
  isChecked: boolean = false;
  frmRegister: FormGroup = new FormGroup({
    r_firstname: new FormControl(''),
    r_lastname: new FormControl(''),
    r_salutation: new FormControl(''),
    r_title: new FormControl(''),
    r_email: new FormControl(''),
    r_password: new FormControl(''),
    r_password2: new FormControl(''),
    r_phone: new FormControl(''),
    r_address: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  frmRegisterSubmit(): void {
    console.log(true);
  }

  toggleIsChecked(): void {
    this.isChecked = !this.isChecked;
  }
}

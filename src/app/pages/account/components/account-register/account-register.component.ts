import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from '../../../../core/services/account.service';
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

  register_errMsg: string = '';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  frmRegisterSubmit(): void {
    this.accountService
      .register({
        first_name: this.frmRegister.controls.r_firstname.value,
        last_name: this.frmRegister.controls.r_lastname.value,
        salutation: this.frmRegister.controls.r_salutation.value,
        title: this.frmRegister.controls.r_title.value,
        email_address: this.frmRegister.controls.r_email.value,
        phone_number: this.frmRegister.controls.r_password.value,
        address: this.frmRegister.controls.r_password2.value,
        password: this.frmRegister.controls.r_phone.value,
        password2: this.frmRegister.controls.r_address.value,
      })
      .subscribe((res) => {
        if (res[0] === true) {
          //show notification about email
        } else {
          if (res[1] !== undefined) this.register_errMsg = res[1];
        }
      });
  }

  toggleIsChecked(): void {
    this.isChecked = !this.isChecked;
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { AccountService } from '../../core/services/account.service';
import { Gender } from '../../common/models/interfaces/contact-gender.interface';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactFrm: FormGroup = new FormGroup({
    gender: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    title: new FormControl(''),
    msg: new FormControl(''),
  });

  genderList: Gender[] = [
    { value: '', label: 'CONTACT.SALUTATION' },
    { value: 'Frau', label: 'CONTACT.MRS' },
    { value: 'Herr', label: 'CONTACT.MR' },
  ];

  msg: string = '';
  msgErr: string = '';

  constructor(
    private contactService: ContactService,
    private accountService: AccountService,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit(): void {
    document.body.style.overflow = 'auto';
    this.accountService.isUserLoggedIn().subscribe((res) => {
      if (res !== false) {
        this.contactFrm.value.first_name = res.first_name;
        this.contactFrm.value.last_name = res.last_name;
        this.contactFrm.value.email = res.email_address;
        this.contactFrm.value.phone = res.phone_number;
      }
    });
  }

  contactFrmSubmit() {
    this.contactService
      .sendEmail({
        gender: this.contactFrm.value.gender,
        first_name: this.contactFrm.value.first_name,
        last_name: this.contactFrm.value.last_name,
        email: this.contactFrm.value.email,
        phone: this.contactFrm.value.phone,
        title: this.contactFrm.value.title,
        msg: this.contactFrm.value.msg,
      })
      .subscribe((res: [boolean, string | undefined]) => {
        if (res[0] === true) this.msg = 'E-Mail wird gesendet';
        else {
          this.msgErr =
            'etwas ist schief gelaufen, bitte versuchen Sie es später';
          //console.log(res[1]);
        }
      });
  }
}

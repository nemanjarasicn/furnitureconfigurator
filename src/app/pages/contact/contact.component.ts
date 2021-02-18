import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { Gender } from '../../common/models/interfaces/contact-gender.interface';

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
    { value: '', label: 'Anrede' },
    { value: 'Frau', label: 'Frau' },
    { value: 'Herr', label: 'Herr' },
  ];

  errMsg: string | undefined = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {}

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
        this.errMsg = res[0] === false ? res[1] : 'ungültige E-Mail';
      });
  }
}

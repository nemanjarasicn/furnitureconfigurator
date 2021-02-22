import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent implements OnInit {
  frmVer: FormGroup = new FormGroup({
    verCode: new FormControl(null),
  });
  userID!: string;
  errMsg: string = '';

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.u === undefined) this.router.navigateByUrl('/');
      else this.userID = params.u;
    });
  }

  submitFrmVer(): void {
    this.accountService
      .verify(this.userID, this.frmVer.controls.verCode.value)
      .subscribe((res) => {
        if (res[0] === true) this.router.navigateByUrl('/account');
        else {
          if (res[1] !== undefined) this.errMsg = res[1];
        }
      });
  }
}

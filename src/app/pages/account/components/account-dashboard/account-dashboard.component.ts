import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/common/models/interfaces/user.interface';
import { AccountService } from '../../../../core/services/account.service';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.scss'],
})
export class AccountDashboardComponent implements OnInit {
  @Input() user!: User | null;
  @Output() loggedChanged = new EventEmitter<boolean>();
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  logoutUser(): void {
    this.accountService.logout().subscribe((res) => {
      if (res === true) this.loggedChanged.emit(false);
    });
  }
}

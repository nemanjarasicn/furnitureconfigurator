import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { CookieService } from '../../core/services/cookie.service';
import { Customer } from '../..//common/models/interfaces/customer.interface';
import { Order } from '../..//common/models/interfaces/order.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-configuration',
  templateUrl: './complete-configuration.component.html',
  styleUrls: ['./complete-configuration.component.scss'],
})
export class CompleteConfigurationComponent implements OnInit {
  orderFrm: FormGroup = new FormGroup({
    first_name: new FormControl(null),
    last_name: new FormControl(null),
    email_address: new FormControl(null),
    phone_number: new FormControl(null),
    address: new FormControl(null),
  });

  order!: Order; /*= {
    num_of_basins: 0,
    sink_type: 0,
    sink_dimensions_width: 14,
    sink_dimensions_height: 14,
    sink_model: '',
    width: 14,
    height: 14,
    depth: 14,
    color_consists_id: 0,
    color_consists_name: '',
    color_front_id: 0,
    color_front_name: '',
    color_cover_plate_id: 0,
    color_cover_plate_name: '',
  };*/

  constructor(
    private accountService: AccountService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    //get from cookie
  }

  frmOrderSubmit(): void {
    const customer: Customer = {
      first_name: this.orderFrm.controls.first_name.value,
      last_name: this.orderFrm.controls.last_name.value,
      phone_number: this.orderFrm.controls.phone_number.value,
      email_address: this.orderFrm.controls.email_address.value,
      address: this.orderFrm.controls.address.value,
    };

    this.accountService.sendOrder(customer, this.order).subscribe((res) => {
      if (res[0] === true)
        this.router.navigateByUrl('/info', { state: { infoType: 'thanks' } });
    });
  }
}

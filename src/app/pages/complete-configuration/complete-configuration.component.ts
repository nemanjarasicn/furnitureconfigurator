import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { CookieService } from '../../core/services/cookie.service';
import { Customer } from '../..//common/models/interfaces/customer.interface';
import { Order } from '../..//common/models/interfaces/order.interface';
import { Router } from '@angular/router';
import { UnsubscriptionError } from 'rxjs';

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

  isLoggedIn: boolean = false;

  order: Order = {
    num_of_basins: 'Einzelnes Waschbecken aus Keramik.',
    sink_type:
      'Aufsatzwaschbecken werden direkt in den Möbelkorpus hinein gelegt.',
    sink_model: 'Nette Ausführung',
    sink_dimensions_width: '14 cm',
    sink_dimensions_height: '14 cm',
    width: '14 cm',
    height: '14 cm',
    depth: '14 cm',
    color_consists: 'Colorado',
    color_front: 'Colorado',
    color_cover_plate: 'Colorado',
  };

  constructor(
    private accountService: AccountService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.accountService.isUserLoggedIn().subscribe((res) => {
      if (res !== false) {
        this.isLoggedIn = true;
        this.orderFrm.reset({
          first_name: res.first_name,
          last_name: res.last_name,
          phone_number: res.phone_number,
          email_address: res.email_address,
          address: res.address,
        });
      }
    });

    //get from cookie
    let tmpCookieVal = this.cookieService.getCookie(
      this.cookieService.cookieKeys.num_of_basins
    );
    if (tmpCookieVal !== undefined) {
      this.order.num_of_basins =
        tmpCookieVal === '0'
          ? 'Einzelnes Waschbecken aus Keramik.'
          : 'ZWei Waschbecken nebeneinander.';
    }

    tmpCookieVal = this.cookieService.getCookie(
      this.cookieService.cookieKeys.sink_type
    );
    if (tmpCookieVal !== undefined) {
      if (tmpCookieVal === '0')
        this.order.sink_type =
          'Aufsatzwaschbecken werden direkt in den Möbelkorpus hinein gelegt.';
      else {
        this.order.sink_type =
          'Definieren Sie die Maße Ihres Waschbeckens selbst.';
        tmpCookieVal = this.cookieService.getCookie(
          this.cookieService.cookieKeys.sink_dimensions_width
        );
        if (tmpCookieVal !== undefined)
          this.order.sink_dimensions_width = tmpCookieVal + ' cm';

        tmpCookieVal = this.cookieService.getCookie(
          this.cookieService.cookieKeys.sink_dimensions_height
        );

        if (tmpCookieVal !== undefined)
          this.order.sink_dimensions_height = tmpCookieVal + ' cm';
      }
    }

    tmpCookieVal = this.cookieService.getCookie(
      this.cookieService.cookieKeys.sink_model
    );
    if (tmpCookieVal !== undefined) {
      switch (tmpCookieVal) {
        case '0':
          this.order.sink_model = 'Nette Ausführung';
          break;
        case '1':
          this.order.sink_model = 'Feinste Keramik';
          break;
        case '2':
          this.order.sink_model = 'Der Sportwagen unter den Waschbecken';
          break;
        case '3':
          this.order.sink_model =
            'Das robuste Weltraummaterial für jeden Einsatzzweck';
          break;
      }
    }

    tmpCookieVal = this.cookieService.getCookie(
      this.cookieService.cookieKeys.width
    );
    if (tmpCookieVal !== undefined) this.order.width = tmpCookieVal + ' cm';

    tmpCookieVal = this.cookieService.getCookie(
      this.cookieService.cookieKeys.height
    );
    if (tmpCookieVal !== undefined) this.order.height = tmpCookieVal + ' cm';

    tmpCookieVal = this.cookieService.getCookie(
      this.cookieService.cookieKeys.depth
    );
    if (tmpCookieVal !== undefined) this.order.depth = tmpCookieVal + ' cm';

    tmpCookieVal = this.cookieService.getCookie(
      this.cookieService.cookieKeys.color_consists
    );
    if (tmpCookieVal !== undefined) this.order.color_consists = tmpCookieVal;

    tmpCookieVal = this.cookieService.getCookie(
      this.cookieService.cookieKeys.color_front
    );
    if (tmpCookieVal !== undefined) this.order.color_front = tmpCookieVal;

    tmpCookieVal = this.cookieService.getCookie(
      this.cookieService.cookieKeys.color_cover_plate
    );
    if (tmpCookieVal !== undefined) {
      this.order.color_cover_plate = tmpCookieVal;
    }
  }

  frmOrderSubmit(): void {
    const customer: Customer = {
      first_name: this.orderFrm.value.first_name,
      last_name: this.orderFrm.value.last_name,
      phone_number: this.orderFrm.value.phone_number,
      email_address: this.orderFrm.value.email_address,
      address: this.orderFrm.value.address,
    };

    this.accountService.sendOrder(customer, this.order).subscribe((res) => {
      if (res[0] === true)
        this.router.navigateByUrl('/info', { state: { infoType: 'thanks' } });
    });
  }
}

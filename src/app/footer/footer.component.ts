import { Component, OnInit } from '@angular/core';
import { NavigationConstants } from '../common/constants/navigation.constants';
import { INavigationItem } from '../common/models/interfaces/navigation-item.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  menuItems: INavigationItem[] = NavigationConstants.NAVIGATION_LIST;
  constructor() {}

  ngOnInit(): void {}
}

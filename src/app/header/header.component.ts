import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationConstants } from '../common/constants/navigation.constants';
import { INavigationItem } from '../common/models/interfaces/navigation-item.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  menuItems: INavigationItem[] = NavigationConstants.NAVIGATION_LIST;

  ngOnInit(): void {
  }

}

import { INavigationItem } from "../models/interfaces/navigation-item.interface";

export abstract class NavigationConstants {

  public static readonly NAVIGATION_LIST: INavigationItem[] = [
    {link: ['homepage'], label: 'NAVIGATION.HOMEPAGE'},
    {link: ['agb'], label: 'NAVIGATION.AGB'},
    {link: ['contact'], label: 'NAVIGATION.CONTACT'},
    {link: ['imprint'], label: 'NAVIGATION.IMPRINT'},
  ]

}

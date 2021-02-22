import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  infoType: string = '';
  constructor(private location: Location) {}

  ngOnInit(): void {
    const locState: any = this.location.getState();
    if (locState.infoType !== undefined) this.infoType = locState?.infoType;
  }
}

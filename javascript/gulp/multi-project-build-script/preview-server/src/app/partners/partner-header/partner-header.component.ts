import {Component, Input, OnInit} from '@angular/core';
import { Location } from "@angular/common";
import { NavigationEnd, Router} from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-partner-header',
  templateUrl: './partner-header.component.html',
  styleUrls: ['./partner-header.component.scss']
})
export class PartnerHeaderComponent implements OnInit {

  @Input()
  title: string;

  canGoBack = false;
  isProject = false;

  constructor(
    private _location: Location,
    private router: Router
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {

      const urlParts = event.url.split('/');

      this.canGoBack = urlParts.length > 2;
      this.isProject = urlParts.length === 4;

    });
  }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }

}

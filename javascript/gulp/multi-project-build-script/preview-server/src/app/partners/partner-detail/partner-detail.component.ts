import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {PartnersService} from "../partners.service";

@Component({
  selector: 'app-partner-detail',
  templateUrl: './partner-detail.component.html',
  styleUrls: ['./partner-detail.component.scss']
})
export class PartnerDetailComponent implements OnInit {

  partner;

  constructor(
    public route: ActivatedRoute,
    public partnerService: PartnersService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.partnerService.getPartner(data.id).then(res => {
        this.partner = res;
      });
    });

  }

}

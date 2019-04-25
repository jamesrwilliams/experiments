import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {PartnersService} from "../partners.service";

@Component({
  selector: 'app-partner-project',
  templateUrl: './partner-project.component.html',
  styleUrls: ['./partner-project.component.scss']
})
export class PartnerProjectComponent implements OnInit {

  project;

  constructor(
    public route: ActivatedRoute,
    public partnerService: PartnersService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.partnerService.getProject(data.id).then(res => {
        this.project = res;
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FileServerService} from "../../file-server.service";

@Component({
  selector: 'app-partner-detail',
  templateUrl: './partner-detail.component.html',
  styleUrls: ['./partner-detail.component.scss']
})
export class PartnerDetailComponent implements OnInit {

  partner;
  projects;

  constructor(
    public route: ActivatedRoute,
    public fs: FileServerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.fs.getPartner(params.id).subscribe((partner: any) => {
        if(partner === null) {
          // TODO Handler for errors.
          this.router.navigate(['/partners']);
        } else {
          this.partner = partner;

          // Need file path here not the name
          this.fs.getProjects(partner.path[1]).subscribe(projects => {
            this.projects = projects;
          });
        }
      });
    });
  }

}

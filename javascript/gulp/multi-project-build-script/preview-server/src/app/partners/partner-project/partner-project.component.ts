import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { FileServerService } from "../../file-server.service";
import {filter, partition} from "rxjs/operators";

@Component({
  selector: 'app-partner-project',
  templateUrl: './partner-project.component.html',
  styleUrls: ['./partner-project.component.scss']
})
export class PartnerProjectComponent implements OnInit {

  project;
  partner;
  projectURL: string;

  constructor(
    public route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private router: Router,
    public fs: FileServerService,
  ) {}

  ngOnInit() {

    this.projectURL = 'http://localhost:4242/static/partners/acme/ACME-002/banner-output.html';

    const location = this.router.url.split('/');
    const partnerID = location[2];

    this.route.params.subscribe((data) => {

      this.fs.getProject(partnerID, data.id).subscribe((project: any) => {
        this.project = project;
      });

      this.fs.getPartner(partnerID).subscribe((partner: any) => {
        this.partner = partner;
        // Set the iframe's default width.
        this.setIframeWidth(partner.breakpoints[0].width);
      });

    });
  }

  updateIframe(width: number) {
    const element = document.getElementById('projectIframe') as HTMLElement;
          element.style.width = width + 'px';
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  refreshIframe() {
    const element = document.getElementById('projectIframe') as HTMLElement;
    element.style.width = 'red';
  }

  setIframeWidth(width) {
    const element = document.getElementById('projectIframe') as HTMLElement;
          element.style.width = width + 'px';
  }
}

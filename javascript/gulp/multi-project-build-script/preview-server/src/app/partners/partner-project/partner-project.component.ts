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
  projectURL;

  API_BASE_URL = 'http://localhost:4242/static/';

  constructor(
    public route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private router: Router,
    public fs: FileServerService,
  ) {}

  ngOnInit() {

    const location = this.router.url.split('/');
    const partnerID = location[2];

    this.route.params.subscribe((data) => {

      this.fs.getProject(partnerID, data.id).subscribe((project: any) => {
        console.log(project);
        this.project = project;
        this.projectURL = this.sanitize(this.API_BASE_URL + this.project.html[0]);
      });

      this.fs.getPartner(partnerID).subscribe((partner: any) => {
        console.log(partner);
        this.partner = partner;
        this.updateIframeWidth(partner.breakpoints[0].width);
      });

    });
  }

  updateIframeWidth(width: number) {

    const element = document.getElementById('projectIframe') as HTMLElement;

    if( element ) {
      element.style.width = width + 'px';
    }
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  refreshIframe() {
    const element = document.getElementById('projectIframe') as HTMLElement;
    element.style.width = 'red';
  }

  updateSourceFile(file) {
    console.log(file);
  }

  displayFileName(filePath) {

    let parts = filePath.split('/');

    return parts[parts.length - 1];
  }
}

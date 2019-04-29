import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from '@angular/platform-browser';
import {FileServerService} from "../../file-server.service";

@Component({
  selector: 'app-partner-project',
  templateUrl: './partner-project.component.html',
  styleUrls: ['./partner-project.component.scss']
})
export class PartnerProjectComponent implements OnInit {

  project;
  partner;
  projectURL;
  selectedHTMLFile: string;
  currentBreakpoint: number;

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
        this.project = project;
        this.selectedHTMLFile = this.project.html[0];
        this.projectURL = this.sanitize(this.API_BASE_URL + this.selectedHTMLFile);
      });

      this.fs.getPartner(partnerID).subscribe((partner: any) => {
        this.partner = partner;
        this.currentBreakpoint = partner.breakpoints[0].width;
        this.updateIframeWidth(this.currentBreakpoint);
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
  }

  updateSourceFile(file) {
    this.projectURL = this.sanitize(this.API_BASE_URL + file);
  }

  displayFileName(filePath) {

    let parts = filePath.split('/');

    return parts[parts.length - 1];
  }
}

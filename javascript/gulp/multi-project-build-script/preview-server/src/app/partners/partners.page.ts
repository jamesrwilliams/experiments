import { Component } from '@angular/core';
import { FileServerService } from "../file-server.service";

@Component({
  selector: 'app-home',
  templateUrl: 'partners.page.html',
  styleUrls: ['partners.page.scss'],
})
export class PartnersPage {

  partners;

  constructor(
      public fs: FileServerService
  ) {
    this.fs.getPartners().subscribe((data) => {
      this.partners = data;
    });
  }
}

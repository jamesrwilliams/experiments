import { Component } from '@angular/core';
import { PartnersService } from "./partners.service";
import { FileServerService } from "../file-server.service";

@Component({
  selector: 'app-home',
  templateUrl: 'partners.page.html',
  styleUrls: ['partners.page.scss'],
})
export class PartnersPage {

  partners;
  data;

  constructor(
      public fs: FileServerService
  ) {
    this.fs.query('partners').subscribe((data) => {
      this.partners = data;
    });
  }

  ping() {
      this.fs.query('partners').subscribe((data) => {
          this.data = data;
      });
  }
}

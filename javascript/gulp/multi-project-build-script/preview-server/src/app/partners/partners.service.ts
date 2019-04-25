import {Injectable} from '@angular/core';
import {Partner} from "../../models/partner.interface";

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  partners: Partner[];

  constructor() {
    this.partners = [
      {
        name: 'Hilton',
        key: 'hilton',
      },
      {
        name: 'Amtrak',
        key: 'amtrak'
      }
    ];
  }

  /**
   * Get an array of all the partners.
   */
  getPartners() {
    return new Promise<Partner[]>((resolve, reject) => {
      resolve(this.partners);
    });
  }

  async getPartner(key: String) {
    const partners = await this.getPartners();
    const partner = partners.filter(item => item.key === key);

    if(partner.length > 1) {
      console.error('Error - Multiple partners found');
      return partner[0];
    } else {
      return partner[0];
    }
  }

  async getProject(key: String) {

  }

}

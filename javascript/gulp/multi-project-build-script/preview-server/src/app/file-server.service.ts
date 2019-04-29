import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileServerService {

  // TODO Move this to env file.
  serverBase = 'http://localhost:4242/api';

  constructor(private http: HttpClient) {}

  query(request) {
    return this.http.get(`${this.serverBase}/${request}`);
  }

  getPartners() {
    return this.http.get(`${this.serverBase}/partners`);
  }

  getProjects(partnerPath: string) {
    return this.http.get(`${this.serverBase}/partners/${partnerPath}/projects`);
  }

  getPartner(partnerKey: string) {
    return this.http.get(`${this.serverBase}/partners/${partnerKey}`);
  }

  getProject(partnerPath: string, projectPath: string) {
    return this.http.get(`${this.serverBase}/partners/${partnerPath}/projects/${projectPath}`);
  }

}

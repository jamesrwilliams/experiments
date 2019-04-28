import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { PartnersPage } from './partners.page';
import { PartnerDetailComponent } from './partner-detail/partner-detail.component';
import { PartnerProjectComponent } from './partner-project/partner-project.component';

import { MatButtonModule, MatToolbarModule, MatListModule, MatIconModule, MatSelectModule } from '@angular/material';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    PartnersPage,
    PartnerDetailComponent,
    PartnerProjectComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          {path: '', component: PartnersPage},
          {
            path: ':id',
            children: [
              {path: '', component: PartnerDetailComponent,},
              {path: ':id', component: PartnerProjectComponent}
            ]
          }
        ]
      }
    ]),
    FormsModule,
    MatIconModule,
  ],
})
export class PartnersModule { }

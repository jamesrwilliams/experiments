import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { PartnersPage } from './partners.page';
import { PartnerDetailComponent } from './partner-detail/partner-detail.component';
import { PartnerProjectComponent } from './partner-project/partner-project.component';

import { MatButtonModule, MatToolbarModule, MatListModule } from '@angular/material';
import { PartnerHeaderComponent } from './partner-header/partner-header.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PartnersPage,
    PartnerDetailComponent,
    PartnerProjectComponent,
    PartnerHeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          { path: '', component: PartnersPage },
          {
            path: ':id',
            children: [
              { path: '', component: PartnerDetailComponent, },
              { path: ':id', component: PartnerProjectComponent }
            ]
          }
        ]
      }
    ]),
  ],
})
export class PartnersModule { }

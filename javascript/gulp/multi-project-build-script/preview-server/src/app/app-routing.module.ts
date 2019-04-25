import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'partners', pathMatch: 'full' },
  { path: 'partners', loadChildren: './partners/partners.module#PartnersModule', data: { title: 'Partners' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

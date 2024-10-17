import { NgModule } from '@angular/core';
import {RouterModule, Routes, UrlSegment} from '@angular/router';
import {PractitionerListComponent} from "./practitioner-list.component";
import {PractitionerComponent} from "./practitioner.component";

const routes: Routes = [
  {
    path: '',
    component: PractitionerListComponent,
  },
  {
    path: 'new',
    component: PractitionerComponent
  },
  {
    path: 'edit/:id',
    component: PractitionerComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PractitionerRoutingModule { }

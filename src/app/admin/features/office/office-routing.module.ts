import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OfficeComponent} from "./office.component";
import {OfficeListComponent} from "./office-list.component";

const routes: Routes = [
  {
    path: '',
    component: OfficeListComponent,
  },
  {
    path: 'new',
    component: OfficeComponent
  },
  {
    path: 'edit/:id',
    component: OfficeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeRoutingModule { }

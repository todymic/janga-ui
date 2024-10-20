import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SpecialityListComponent} from "./speciality-list.component";
import {SpecialityComponent} from "./speciality.component";
const routes: Routes = [
  {
    path: '',
    component: SpecialityListComponent,
  },
  {
    path: 'new',
    component: SpecialityComponent
  },
  {
    path: 'edit/:id',
    component: SpecialityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialityRoutingModule { }

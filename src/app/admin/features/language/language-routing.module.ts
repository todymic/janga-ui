import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LanguageListComponent} from "./language-list.component";
import {LanguageComponent} from "./language.component";

const routes: Routes = [
  {
    path: '',
    component: LanguageListComponent,
  },
  {
    path: 'new',
    component: LanguageComponent
  },
  {
    path: 'edit/:id',
    component: LanguageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguageRoutingModule { }

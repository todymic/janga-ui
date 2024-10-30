import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "../admin/admin.component";
import {FrontComponent} from "./front.component";

const routes: Routes = [
  {
    path: '',
    component: FrontComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
      }
    ]

  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }

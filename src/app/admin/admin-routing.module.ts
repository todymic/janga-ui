import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {AdminComponent} from "./admin.component";
import {ListComponent} from "./features/page/list/list.component";
import {dashboardGuard} from "@admin/core/guards/dashboard.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@admin/features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: AdminComponent,
    canActivateChild: [dashboardGuard],
    children: [
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
      },
      {
        path: 'index',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'practitioners',
        loadChildren: () => import('./features/practitioner/practitioner.module').then(m => m.PractitionerModule)
      },
      {
        path: 'offices',
        loadChildren: () => import('./features/office/office.module').then(m => m.OfficeModule)
      },
      {
        path: 'specialities',
        loadChildren: () => import('./features/speciality/speciality.module').then(m => m.SpecialityModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}

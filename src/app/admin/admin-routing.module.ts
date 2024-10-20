import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {AdminComponent} from "./admin.component";
import {ListComponent} from "./features/page/list/list.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
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
        path: 'languages',
        loadChildren: () => import('./features/language/language.module').then(m => m.LanguageModule)
      },
      {
        path: 'specialities',
        loadChildren: () => import('./features/speciality/speciality.module').then(m => m.SpecialityModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}

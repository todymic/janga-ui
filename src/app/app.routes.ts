import { Routes } from '@angular/router';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '',
    loadChildren: () => import('./front/front.module').then(m => m.FrontModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

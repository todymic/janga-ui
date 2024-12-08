import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "../admin/admin.component";
import {FrontComponent} from "./front.component";
import {DetailComponent} from "@features/practitioners/detail/detail.component";
import {practitionerResolver} from "@core/resolver/practitioner.resolver";
import {appointmentResolver} from "@core/resolver/appointment.resolver";

const routes: Routes = [
  {
    path: '',
    component: FrontComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'practitioners/:id',
        component: DetailComponent,
        resolve: {
          practitioner: practitionerResolver
        }

      },
      {
        path: 'booking',
        loadChildren: () => import('./features/booking/booking.module').then(m => m.BookingModule),
        resolve: {
          appointment: appointmentResolver,
        }
      },
      {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
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

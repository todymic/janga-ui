import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OfficeComponent} from "@features/booking/office/office.component";
import {ReasonComponent} from "@features/booking/reason/reason.component";
import {RelationComponent} from "@features/booking/relation/relation.component";
import {PatientComponent} from "@features/booking/patient/patient.component";
import {AvailabilitiesComponent} from "@features/booking/availabilities/availabilities.component";
import {ConfirmationComponent} from "@features/booking/confirmation/confirmation.component";
import {BookingComponent} from "@features/booking/booking.component";
import {practitionerResolver} from "@core/resolver/practitioner.resolver";

const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
    resolve: {
      practitioner: practitionerResolver
    }

    // children: [
    //   {
    //     path: 'office',
    //     component: OfficeComponent
    //   },
    //   {
    //     path: 'relation',
    //     component: RelationComponent
    //   },
    //   {
    //     path: 'reason',
    //     component: ReasonComponent
    //   },
    //   {
    //     path: 'patient',
    //     component: PatientComponent
    //   },
    //   {
    //     path: 'availabilities',
    //     component: AvailabilitiesComponent
    //   },
    //   {
    //     path: 'confirmation',
    //     component: ConfirmationComponent
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }

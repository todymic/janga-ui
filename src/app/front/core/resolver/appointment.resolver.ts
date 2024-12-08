import { ResolveFn } from '@angular/router';
import {AppointmentService} from "@core/services/appointment.service";
import {inject} from "@angular/core";
import {Appointment} from "@core/models/appointment";

export const appointmentResolver: ResolveFn<Appointment | null
> = (route, state) => {

  const currentAppointment = inject(AppointmentService);

  return currentAppointment.currentAppointment;
};

import { ResolveFn } from '@angular/router';
import {Reason} from "@core/models/reason";
import {AppointmentService} from "@core/services/appointment.service";
import {inject} from "@angular/core";
import {Appointment} from "@core/models/appointment";
import {lastValueFrom} from "rxjs";
import {BookingData} from "@core/utilities/type";

export const bookingResolver: ResolveFn<BookingData | null> = async (route, state) => {

  let reasons!: Reason[];


  const appointmentService = inject(AppointmentService);
  const appointment = appointmentService.currentAppointment as Appointment;

  reasons =  await lastValueFrom(appointmentService.getReasons(String(appointment.practitionerId)));

  if(reasons.length == 1 ) {
    appointment.reasonId = reasons[0].id;
    appointmentService.updateAppointment = appointment;
  }

  return {
    reasons: reasons
  };
};

import { ResolveFn } from '@angular/router';
import {Practitioner} from "@admin/core/interfaces/practitioner.interface";
import {PractitionerService} from "@admin/core/services/practitioner.service";
import {inject} from "@angular/core";
import {AppointmentService} from "@core/services/appointment.service";

export const practitionerResolver: ResolveFn<Practitioner | null> = (route, state) => {

  const practitionerService = inject(PractitionerService);
  const appointmentService = inject(AppointmentService);
  let currentId = null;
  if( route.params['id']) {
    currentId = route.params['id']
  } else if(appointmentService.currentAppointment) {

    const appointment = appointmentService.currentAppointment;
    currentId =  appointment?.practitionerId;

  }



  return currentId ? practitionerService.getOne(currentId) : null;
};

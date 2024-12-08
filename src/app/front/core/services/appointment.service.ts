import {inject, Injectable, signal} from '@angular/core';
import {Appointment} from "@core/models/appointment";
import {SessionService} from "@core/services/session.service";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private _session: SessionService = inject(SessionService);
  private _appointment = signal<Appointment | null>(this._session.getItem('appointment'));
  constructor() { }


  get currentAppointment(): Appointment | null {
    return this._appointment();
  }
  set updateAppointment(appointment: Appointment) {
    this._appointment.set(appointment);
    this._session.saveItem('appointment', appointment);

  }


}

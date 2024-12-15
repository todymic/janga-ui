import {inject, Injectable, signal} from '@angular/core';
import {Appointment} from "@core/models/appointment";
import {SessionService} from "@core/services/session.service";
import {Reason} from "@core/models/reason";
import {HttpClient, HttpStatusCode} from "@angular/common/http";
import {environment} from "@environment/environment.development";
import {map, Observable} from "rxjs";
import {GetReasonResponse} from "@core/utilities/response";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private _http: HttpClient = inject(HttpClient);

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

  getReasons(practitionerId: string): Observable<Reason[]> {
    return this._http.get<GetReasonResponse>(environment.apiUrl + `reasons/practitioner/${practitionerId}`).pipe(
      map(response => {
        return response.reasons;
      })
    )
  }
}

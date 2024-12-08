import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {AppointmentService} from "@core/services/appointment.service";
import {Appointment} from "@core/models/appointment";
import {SessionService} from "@core/services/session.service";

@Injectable({
  providedIn: 'root'
})
export class StepService {

  private _appointmentService = inject(AppointmentService);

  private _session = inject(SessionService);

  private appointment!: Appointment | null;

  private steps: string[] = ['office', 'relation', 'reason', 'availabilities', 'patient'];

  initStep: number = this._session.getItem('step') ?? this.steps.indexOf('office');

  private readonly _currentStep: WritableSignal<number>  = signal<number>(this.initStep);

  constructor() {

    this.appointment = this._appointmentService.currentAppointment;

    // if office already set, start from relation step
    if(this.appointment?.officeId && this.currentStep == 0) {
      this.next();
    }

    this.initStep = this.currentStep;
    this._session.saveItem('step', this.initStep);
  }

  next() {
    if(this._currentStep() < this.steps.length - 1) {
      this._currentStep.update((step) => step + 1);
      this._session.saveItem('step', this.currentStep);
    }


  }

  back() {
    if(0 < this.currentStep) {
      this._currentStep.update((step) => step - 1);
      this._session.saveItem('step', this.currentStep);
    }

  }

  get currentStep(): number {
    return this._currentStep();
  }

}

import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {AppointmentService} from "@core/services/appointment.service";
import {Appointment} from "@core/models/appointment";
import {SessionService} from "@core/services/session.service";
import {Step} from "@features/booking/interface/step.booking";

@Injectable({
  providedIn: 'root'
})
export class StepService {

  private _session = inject(SessionService);

  steps: Step[] = [];

  initStep: number = this._session.getItem('step') ?? 0;

  private readonly _currentStep: WritableSignal<number>  = signal<number>(this.initStep);

  constructor() {

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

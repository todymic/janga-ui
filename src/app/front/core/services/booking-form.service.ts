import {computed, inject, Injectable, signal} from '@angular/core';
import {StepService} from "@core/services/step.service";
import {AbstractControl} from "@angular/forms";
import {Step} from "@features/booking/interface/step.booking";

@Injectable({
  providedIn: 'root'
})
export class BookingFormService {

  private _stepService = inject(StepService);

  private _isValidForm = signal<boolean>(false);

  isValidStep = computed(()=> this._isValidForm());

  get currentStep() {
    return this._stepService.currentStep;
  }

  initForm(steps: Step[]) {
    this._stepService.steps = steps;
  }

  indexOfStep(stepLabel: string): number {

    const foundStep = this._stepService.steps.find(step => step.label.toLowerCase() == stepLabel);

    if(!foundStep) {
      throw Error('Step not found');
    }

    return this._stepService.steps.indexOf(foundStep);
  }

  validCurrentStep(form: AbstractControl, stepLabel: string) {
    return this._stepService.currentStep == this.indexOfStep(stepLabel) && this._isValidForm.set(form.valid);
  }

  backStep() {
    this._stepService.back();
  }

  nextStep() {
    this._stepService.next();
  }

  finalStep(): number {
    return this._stepService.steps.length - 1;
  }
}

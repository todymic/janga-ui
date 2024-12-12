import {FormBuilder, FormGroup} from "@angular/forms";
import {Component, inject} from "@angular/core";
import {AppointmentService} from "@core/services/appointment.service";
import {Control, StepBooking} from "@core/utilities/type";
import {BookingFormService} from "@core/services/booking-form.service";

export interface ComponentInterface {
}

export class BaseComponent<T extends StepBooking>  {

  protected formGroup!: FormGroup<Control<T>>;
  protected formBuilder: FormBuilder = inject(FormBuilder);
  protected appointmentService = inject(AppointmentService);
  protected bookingFormService = inject(BookingFormService);



}

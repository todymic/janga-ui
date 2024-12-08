import {FormBuilder, FormGroup} from "@angular/forms";
import {inject} from "@angular/core";
import {AppointmentService} from "@core/services/appointment.service";
import {Control} from "@core/utilities/type";
import {StepBooking} from "@features/booking/interface/step.booking";

export class BaseComponent<T extends StepBooking> {

  protected form!: FormGroup<Control<T>>;
  protected formBuilder: FormBuilder = inject(FormBuilder);
  protected _appointmentService = inject(AppointmentService);
}

import {Component, inject, Input, OnInit} from '@angular/core';
import {BaseComponent} from "@features/booking/base-component";
import {ReasonBooking} from "@features/booking/interface/reason.booking";
import {Practitioner} from "@core/models/practitioner";
import {Control} from "@core/utilities/type";
import {ReactiveFormsModule, Validators} from "@angular/forms";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {Reason} from "@core/models/reason";
import {AppointmentService} from "@core/services/appointment.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-reason',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatListOption,
    MatSelectionList
  ],
  templateUrl: './reason.component.html',
  styleUrl: './reason.component.scss'
})
export class ReasonComponent extends BaseComponent<ReasonBooking> implements OnInit {

  @Input() practitioner!: Practitioner;

  private _appointmentService = inject(AppointmentService);

  private _destroyObj$ = new Subject<boolean>();

  reasons: Reason[] = [];

  ngOnInit(): void {

    // retrieve reasons
    this._appointmentService.getReasons(this.practitioner.id as string).pipe(
      takeUntil(this._destroyObj$)
    ).subscribe({
      next: (value: Reason[]) => this.reasons = value
    })


    // Initialize form
    const initValue = this.appointment?.reasonId ? [this.appointment?.reasonId] : undefined;

    this.formGroup = this.formBuilder.group<Control<ReasonBooking>>({
      reason: this.formBuilder.control(initValue, [Validators.required])
    });

    this.bookingFormService.validCurrentStep(this.formGroup.controls.reason, 'reasons');


    // On form change
    this.formGroup.controls.reason.valueChanges.pipe(
      takeUntil(this._destroyObj$)
    ).subscribe({
      next: value => {

        if (this.appointment) {
          this.appointment.reasonId = value[0];
          this.appointmentService.updateAppointment = this.appointment;
          this.bookingFormService.validCurrentStep(this.formGroup.controls.reason, 'reasons');
        }

      }
    });
  }
}

import {Component, inject, Input, OnInit} from '@angular/core';
import {Practitioner} from "@core/models/practitioner";
import {JsonPipe} from "@angular/common";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {ReactiveFormsModule, Validators} from "@angular/forms";
import {Appointment} from "@core/models/appointment";
import {BaseComponent} from "@features/booking/base-component";
import {OfficeBooking} from "@features/booking/interface/office.booking";
import {RelationBooking} from "@features/booking/interface/relation.booking";
import {Control} from "@core/utilities/type";
import {AppointmentService} from "@core/services/appointment.service";

@Component({
  selector: 'app-relation',
  standalone: true,
  imports: [
    JsonPipe,
    MatListOption,
    MatSelectionList,
    ReactiveFormsModule
  ],
  templateUrl: './relation.component.html',
  styleUrl: './relation.component.scss'
})
export abstract class RelationComponent  extends BaseComponent<RelationBooking> implements OnInit {

  @Input() practitioner!: Practitioner;

  @Input() appointment!: Appointment;

  protected relationType: string[] = [ '1' , '0' ]

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group<Control<RelationBooking>>({
      relation: this.formBuilder.control<string>('', [Validators.required])
    });

    this.bookingFormService.validCurrentStep(this.formGroup.controls.relation, 'relations');

    const appointment = this.appointmentService.currentAppointment;

    // initialize
    const initValue = appointment?.relation !== undefined && appointment?.relation == 0 ? '0' : '1';
    if(appointment?.relation !== undefined) {
      this.formGroup.controls.relation.patchValue([initValue]);
      this.bookingFormService.validCurrentStep(this.formGroup.controls.relation, 'relations');
    }

    // listen on form changes
    this.formGroup.controls.relation.valueChanges.subscribe({
      next: value => {

        if(appointment) {
          appointment.relation = Number(value[0]);
          this.appointmentService.updateAppointment = appointment;
        }

        this.bookingFormService.validCurrentStep(this.formGroup.controls.relation, 'relations');
      }
    })


  }

  abstract initFormGroup(): void;

}

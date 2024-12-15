import {Component, Input, OnInit} from '@angular/core';
import {Practitioner} from "@core/models/practitioner";
import {JsonPipe} from "@angular/common";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {ReactiveFormsModule, Validators} from "@angular/forms";
import {BaseComponent} from "@features/booking/base-component";
import {RelationBooking} from "@features/booking/interface/relation.booking";
import {Control} from "@core/utilities/type";

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

  protected relationType: string[] = [ '1' , '0' ]

  ngOnInit(): void {
    // initialize
    let initValue: string[] | undefined;

    if(this.appointment?.relation !== undefined) {
      initValue = [ '' + this.appointment?.relation ]
    }

    this.formGroup = this.formBuilder.group<Control<RelationBooking>>({
      relation: this.formBuilder.control< string[] | undefined>(initValue, [Validators.required])
    });

    this.bookingFormService.validCurrentStep(this.formGroup.controls.relation, 'relations');


    // listen on form changes
    this.formGroup.controls.relation.valueChanges.subscribe({
      next: value => {
        if(this.appointment) {
          this.appointment.relation = Number(value[0]);
          this.appointmentService.updateAppointment = this.appointment;
        }

        this.bookingFormService.validCurrentStep(this.formGroup.controls.relation, 'relations');
      }
    })

  }

}

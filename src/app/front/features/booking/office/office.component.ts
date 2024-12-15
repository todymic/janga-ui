import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnInit, SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {Appointment} from "@core/models/appointment";
import {JsonPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelect} from "@angular/material/select";
import {AppointmentService} from "@core/services/appointment.service";
import {Practitioner} from "@core/models/practitioner";
import {MatListModule} from '@angular/material/list';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Office} from "@core/models/office";
import {Control} from "@core/utilities/type";
import {BaseComponent, ComponentInterface} from "@features/booking/base-component";
import {OfficeBooking} from "@features/booking/interface/office.booking";

@Component({
  selector: 'app-office',
  standalone: true,
  imports: [
    JsonPipe,
    RouterLink,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelect,
    MatListModule,
    ReactiveFormsModule
  ],
  templateUrl: './office.component.html',
  styleUrl: './office.component.scss'
})
export class OfficeComponent extends BaseComponent<OfficeBooking> implements OnInit {

  @Input() practitioner!: Practitioner;

  offices: Office[] = [];

  ngOnInit(): void {

    let initValue: Office[] | undefined = [];
    // //Init value
    if (this.appointment?.officeId) {
       const office = this.practitioner.offices.find(office => office.id == this.appointment?.officeId);

     if(office) {
       initValue = [office];
     }

    }

    this.formGroup = this.formBuilder.group<Control<OfficeBooking>>({
        office: this.formBuilder.control(initValue, [Validators.required])
      })

    this.bookingFormService.validCurrentStep(this.formGroup.controls.office, 'offices');

    // save data
    this.formGroup.controls.office.valueChanges.subscribe({
      next: value => {
        if (this.appointment) {
          this.appointment.officeId = value[0]?.id;
          this.appointmentService.updateAppointment = this.appointment;
        }

        this.bookingFormService.validCurrentStep(this.formGroup.controls.office, 'offices')
      }
    });



  }
}

import {
  Component, computed,
  inject,
  Input, OnInit, Signal, signal
} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {Appointment} from "@core/models/appointment";
import {JsonPipe, NgComponentOutlet, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {OfficeComponent} from "@features/booking/office/office.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
import {ReasonComponent} from "@features/booking/reason/reason.component";
import {RelationComponent} from "@features/booking/relation/relation.component";
import {AvailabilitiesComponent} from "@features/booking/availabilities/availabilities.component";
import {PatientComponent} from "@features/booking/patient/patient.component";
import {Practitioner} from "@core/models/practitioner";
import {BookingFormService} from "@core/services/booking-form.service";
import {Step} from "@features/booking/interface/step.booking";
import {BaseComponent} from "@features/booking/base-component";

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    RouterOutlet,
    JsonPipe,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgComponentOutlet,
    MatCardModule,
    MatButtonToggleGroup,
    NgTemplateOutlet,
    NgForOf,
    MatIcon,
    NgIf
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {

  @Input() appointment!: Appointment;

  @Input() practitioner!: Practitioner;

  bookingFormService: BookingFormService = inject(BookingFormService);

  stepComponent: Signal<any> | null = null;

  validComponent =  computed(() => {
    return this.stepComponent  ? this.stepComponent() : null;
  })

  steps: Step[] = [];

  ngOnInit(): void {

    this.steps = [

      {
        label: 'Relations',
        link: 'office/link',
        icon: 'handshake',
        component: RelationComponent
      },
      {
        label: 'Reasons',
        link: 'reason/link',
        icon: 'reason',
        component: ReasonComponent
      },
      {
        label: 'Availabilities',
        link: 'availabilities/link',
        icon: 'event available',
        component: AvailabilitiesComponent
      },
      {
        label: 'Patient',
        link: 'patient/link',
        icon: 'patient',
        component: PatientComponent
      }

    ];

    if(this.practitioner) {
      if(this.practitioner.offices.length > 1) { // if office already set, start form relation step

        this.steps = [...[{
          label: 'Offices',
          link: 'office/link',
          icon: 'apartment',
          component: OfficeComponent
        }], ...this.steps]
      }

      this.bookingFormService.initForm(this.steps);

      this.stepComponent = computed(() => this.steps[this.bookingFormService.currentStep].component);

    }
  }

}

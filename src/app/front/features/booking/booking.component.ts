import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ComponentRef, computed,
  inject,
  Input, OnDestroy,
  OnInit, TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {Appointment} from "@core/models/appointment";
import {JsonPipe, NgComponentOutlet, NgForOf, NgTemplateOutlet} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {StepService} from "@core/services/step.service";

interface Step {
  label: string,
  link: string,
  icon: string
}

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
    MatIcon
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {

  @Input() appointment!: Appointment;

  @Input() practitioner!: Practitioner;

  private _formBuilder = inject(FormBuilder);

  private _routes = inject(ActivatedRoute);

  private _stepService = inject(StepService);

  stepComponent = computed(() => this.componentMap[this._stepService.currentStep]);

  componentMap = [
    OfficeComponent,
    RelationComponent,
    ReasonComponent,
    AvailabilitiesComponent,
    PatientComponent
  ];

  resumeStepTpl!: TemplateRef<any> | null;

  steps: Step[] = [];

  ngOnInit(): void {

    this.steps = [
      {
        label: 'Offices',
        link: 'office/link',
        icon: 'apartment'
      },
      {
        label: 'Relations',
        link: 'office/link',
        icon: 'handshake'
      },
      {
        label: 'Reasons',
        link: 'reason/link',
        icon: 'reason'
      },
      {
        label: 'Availabilities',
        link: 'availabilities/link',
        icon: 'event available'
      },
      {
        label: 'Patient',
        link: 'patient/link',
        icon: 'patient'
      },
      {
        label: 'Confirmation',
        link: 'confirmation/link',
        icon: 'confirmation'
      }

    ];

  }


  backStep($event: MouseEvent) {
    this._stepService.back();
    console.log(this._stepService.currentStep)

  }

  nextStep($event: MouseEvent) {
    this._stepService.next();
    console.log(this._stepService.currentStep)
  }
}

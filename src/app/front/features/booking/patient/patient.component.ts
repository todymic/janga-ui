import { Component } from '@angular/core';
import {BaseComponent} from "@features/booking/base-component";
import {PatientBooking} from "@features/booking/interface/patient.booking";

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent extends BaseComponent<PatientBooking>  {

}

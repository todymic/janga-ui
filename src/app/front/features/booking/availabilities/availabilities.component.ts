import { Component } from '@angular/core';
import {BaseComponent} from "@features/booking/base-component";
import {AvailabilityBooking} from "@features/booking/interface/availabilityBooking";

@Component({
  selector: 'app-availabilities',
  standalone: true,
  imports: [],
  templateUrl: './availabilities.component.html',
  styleUrl: './availabilities.component.scss'
})
export class AvailabilitiesComponent extends BaseComponent<AvailabilityBooking> {

}

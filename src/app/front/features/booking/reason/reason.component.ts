import { Component } from '@angular/core';
import {BaseComponent} from "@features/booking/base-component";
import {ReasonBooking} from "@features/booking/interface/reason.booking";

@Component({
  selector: 'app-reason',
  standalone: true,
  imports: [],
  templateUrl: './reason.component.html',
  styleUrl: './reason.component.scss'
})
export class ReasonComponent extends BaseComponent<ReasonBooking>  {}

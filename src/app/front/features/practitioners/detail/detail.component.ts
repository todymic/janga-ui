import {Component, inject, Input, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {JsonPipe, NgComponentOutlet, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Practitioner} from "@admin/core/interfaces/practitioner.interface";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatChipsModule} from '@angular/material/chips';
import {GoogleMap} from '@angular/google-maps';
import {MapComponent} from "@shared/map/map.component";
import {AppointmentService} from "@core/services/appointment.service";
import {Appointment} from "@core/models/appointment";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatButton,
    MatDivider,
    MatChipsModule,
    NgForOf,
    NgIf,
    JsonPipe,
    GoogleMap,
    MapComponent,
    NgComponentOutlet,
    RouterOutlet
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  private _router = inject(Router);

  private _activeRoute = inject(ActivatedRoute);

  private _appointmentService = inject(AppointmentService);

  protected currentId!: number;

  @Input() practitioner!: Practitioner;

  protected baseUrl!: string;

  positions = signal<google.maps.LatLngLiteral[]>([]);

  isBooking = signal<boolean>(false);

  constructor(private _activateRoute: ActivatedRoute) {
   this.currentId = this._activateRoute.snapshot.params['id'];
   this.baseUrl = this._router.url;

  }

  ngOnInit(): void {

   // console.log(this.practitioner);

    // console.log(this.practitioner.offices.length, this.practitioner.offices[0])

  }

  onBooking() {

    // init the appointment session
    const appointment: Appointment = {
      practitionerId: this.practitioner.id as number,
    };

   // if the practitioner has only 1 office, save directly the officeId
    if(this.practitioner.offices.length == 1) {
      appointment.officeId = this.practitioner.offices[0].id;
    }

    this._appointmentService.updateAppointment = appointment;

   this._router.navigate(['booking']).then();

  }

}

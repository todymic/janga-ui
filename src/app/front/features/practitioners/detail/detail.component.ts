import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PractitionerService} from "@admin/core/services/practitioner.service";
import {JsonPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Practitioner} from "@admin/core/interfaces/practitioner.interface";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatChipsModule} from '@angular/material/chips';
import {GoogleMap} from '@angular/google-maps';
import {MapComponent} from "@shared/map/map.component";

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
    MapComponent
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  protected currentId!: number;
  protected practitioner: WritableSignal<Practitioner | null> = signal<Practitioner | null>(null);
  protected baseUrl!: string
  constructor(private _activateRoute: ActivatedRoute, private _practitionerService: PractitionerService, private _router: Router ) {
   this.currentId = this._activateRoute.snapshot.params['id'];
   this.baseUrl = this._router.url;

  }

  ngOnInit(): void {

    this._practitionerService.getOne(this.currentId).subscribe({
      next: (practitioner: Practitioner) => this.practitioner.set(practitioner)
    })


  }
}

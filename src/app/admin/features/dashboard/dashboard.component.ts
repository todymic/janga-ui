import {Component, inject, OnInit} from '@angular/core';
import {Practitioner} from "../../core/interfaces/practitioner.interface";
import {PractitionerService} from "../../core/services/practitioner.service";
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {OfficeService} from "../../core/services/office.service";
import {Office} from "../../core/interfaces/office.interface";
import {MatGridList} from "@angular/material/grid-list";
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatButton,
    MatGridList,
    MatGridListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  practitionerService: PractitionerService = inject(PractitionerService);
  practitioners!: Practitioner[];

  officeService: OfficeService = inject(OfficeService);
  offices!: Office[];


  constructor(private route: Router) {
  }
  ngOnInit(): void {
    this.practitionerService.getAll().subscribe(practitioners => this.practitioners = practitioners)
    this.officeService.getAll().subscribe(offices => this.offices = offices)
  }

  createPractitioner() {
    this.route.navigate(['admin', 'practitioners', 'new']).then();
  }

  createOffice() {
    this.route.navigate(['admin', 'offices', 'new']).then();
  }
}

import {Component, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatListModule} from '@angular/material/list';
import {PractitionerService} from "../../../core/services/practitioner.service";
import {Practitioner as IPractitioner} from "../../../core/interfaces/practitioner.interface";
import {Practitioner} from "../../../core/models/practitioner.model";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButton,
    MatAnchor,
    MatCheckbox,
    FormsModule,
    RouterOutlet,
    MatListModule,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnChanges {

  @ViewChild('sidenav', {read: MatSidenav}) sidenav!: MatSidenav ;
  @Input() isOpened!: boolean;
  events: string[] = [];


  ngOnChanges(changes: SimpleChanges): void {
    if( 'isOpened' in changes) {
      this.sidenav?.toggle(changes['isOpened'].currentValue)
    }
  }

}

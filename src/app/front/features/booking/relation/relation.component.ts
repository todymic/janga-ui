import {Component, Input} from '@angular/core';
import {Practitioner} from "@core/models/practitioner";
import {JsonPipe} from "@angular/common";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {ReactiveFormsModule} from "@angular/forms";
import {Appointment} from "@core/models/appointment";

@Component({
  selector: 'app-relation',
  standalone: true,
  imports: [
    JsonPipe,
    MatListOption,
    MatSelectionList,
    ReactiveFormsModule
  ],
  templateUrl: './relation.component.html',
  styleUrl: './relation.component.scss'
})
export class RelationComponent {
  @Input() practitioner!: Practitioner;
  @Input() appointment!: Appointment;
}

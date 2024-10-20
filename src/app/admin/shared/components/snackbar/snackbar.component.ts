import {Component, inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";
import {SnackbarData} from "../../../core/interfaces/snackbar.interface";

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  data: SnackbarData  = inject(MAT_SNACK_BAR_DATA)
}

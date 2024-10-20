import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {ConfirmDialog} from "../../../../core/interfaces/dialog.interface";
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogModule
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  data: ConfirmDialog = inject(MAT_DIALOG_DATA);
}

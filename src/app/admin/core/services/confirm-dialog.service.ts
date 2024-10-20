import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/components/dialog/confirm-dialog/confirm-dialog.component";
import {Observable} from "rxjs";
import {ConfirmDialog} from "../interfaces/dialog.interface";

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {
  }

  confirm(data: ConfirmDialog): Observable<boolean> {
    return this.dialog.open(ConfirmDialogComponent, {
      data,
      disableClose: true
    }).afterClosed()
  }
}

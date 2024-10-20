import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarComponent} from "../../shared/components/snackbar/snackbar.component";
import {SnackbarData} from "../interfaces/snackbar.interface";


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  duration: number = 2;

  constructor(private _snackbar: MatSnackBar) {
  }

  open(data: SnackbarData) {
    this._snackbar.openFromComponent(SnackbarComponent, {
      data,
      duration: this.duration * 1000
    })
  }
}

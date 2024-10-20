import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ConfirmDialogService} from "./confirm-dialog.service";
import {SnackbarService} from "./snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class BaseFormService  {
  formBuilder: FormBuilder = inject(FormBuilder);
  formGroup!: FormGroup;
  snackBar: SnackbarService = inject(SnackbarService);
  dialog: ConfirmDialogService = inject(ConfirmDialogService);

  constructor() { }
  isValidField(lastname: string): boolean | undefined {
    const field = this.formGroup.get(lastname);
    return field?.invalid && (field?.dirty || field?.touched);
  }

}

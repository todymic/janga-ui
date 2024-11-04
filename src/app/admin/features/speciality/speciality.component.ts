import {Component, inject, OnInit} from '@angular/core';
import {SingleComponent} from "../page/single/single.component";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule, Validators} from "@angular/forms";
import {SpecialityService} from "../../core/services/speciality.service";
import {Speciality} from "../../core/interfaces/speciality.interface";

@Component({
  selector: 'app-speciality',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './speciality.component.html',
  styleUrl: './speciality.component.scss'
})
export class SpecialityComponent extends SingleComponent<Speciality> implements OnInit {

  private _specialityService: SpecialityService = inject(SpecialityService);

  override ngOnInit() {

    this.formService.formGroup = this.formService.formBuilder.group({
      name: ['', Validators.required]
    })
    super.ngOnInit();

    if (this.currentId) {

      this._specialityService.getOne(this.currentId).subscribe({
        next: (speciality: Speciality) => {
          this.singleFormGroup.patchValue(speciality);
          this.isEditContext = true;
          this._initialValue = speciality;
        }

      })

    }
  }

  onReset() {
    this.singleFormGroup.reset(this._initialValue);
  }

  onSubmit($event: Event) {
    const speciality = this.singleFormGroup.value as Speciality;

    if (this.isEditContext) {

      speciality.id = this.currentId;

      this._specialityService.update(speciality).subscribe({
        next: () => {
          this.formService.snackBar.open({content: "speciality successfully updated!"})

          this._router.navigate(["admin", "specialities"]).then()
        }
      })

    } else {

      this._specialityService.create(speciality).subscribe({
        next: () => {
          this.formService.snackBar.open({content: "speciality successfully added!"})

          this._router.navigate(["admin", "specialities"]).then()
        }
      })
    }
  }

  onRemove() {

    this.formService.dialog.confirm({
      title: "Confirm delete",
      content: "Are you sure to delete this speciality?"
    }).subscribe({
      next: (confirm: boolean) => {
        if (confirm) {
          this._specialityService.delete(this.currentId).subscribe({
            next: () => {
              this.formService.snackBar.open({content: "speciality successfully deleted!"})

              this._router.navigate(["admin", "specialities"]).then()
            }
          })
        }
      }
    })
  }

}

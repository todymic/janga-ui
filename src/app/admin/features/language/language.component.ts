import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule, Validators} from "@angular/forms";
import {SingleComponent} from "../page/single/single.component";
import {LanguageService} from "../../core/services/language.service";
import {Language} from "../../core/interfaces/language.interface";
import {SinglePageInterface} from "../../core/interfaces/single_page.interface";

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss'
})
export class LanguageComponent  extends SingleComponent implements OnInit, SinglePageInterface {

  private _languageService: LanguageService = inject(LanguageService);


  override ngOnInit() {

    this.formService.formGroup = this.formService.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required]
    })

    super.ngOnInit();

    if(this.currentId) {
      this._languageService.getOne(this.currentId).subscribe({
        next: (language: Language) => {
          this.singleFormGroup.patchValue(language)
          this._initialValue = language;
          this.isEditContext = true;
        }
      })


    }
  }

  onRemove() {
    this.formService.dialog.confirm({
      title: "Confirm delete",
      content: "Are you sure to delete?"
    }).subscribe({
      next: confirm => {

        if(confirm) {

          this._languageService.delete(this.currentId ).subscribe({
            next: () => {
              this.formService.snackBar.open({ content: "language successfully deleted!" })
              this._router.navigate(["admin", "languages"]).then()
            }
          })

        }
      }
    })
  }

  onReset() {
    this.singleFormGroup.reset(this._initialValue);
  }

  onSubmit($event: Event) {

    const language: Language = this.singleFormGroup.value;

    if(this.isEditContext) {

      language.id = this.currentId;

      this._languageService.update(language).subscribe({
        next: () => {
          this.formService.snackBar.open({ content: "language successfully updated!" })
          this._router.navigate(["admin", "languages"]).then()
        }
      })

    } else {

      this._languageService.create(language).subscribe({
        next: () => {
          this.formService.snackBar.open({ content: "language successfully created!" })
          this._router.navigate(["admin", "languages"]).then()
        },
        error: err => console.log(err)
      })
    }
  }
}

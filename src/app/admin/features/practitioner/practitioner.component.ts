import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatOption, MatSelect} from "@angular/material/select";
import {EditorComponent} from "@tinymce/tinymce-angular";
import {MatButtonModule} from '@angular/material/button';
import {PractitionerService} from "../../core/services/practitioner.service";
import {Practitioner} from "../../core/interfaces/practitioner.interface";
import {Subscription} from "rxjs";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SingleComponent} from "../page/single/single.component";
import {Office} from "../../core/interfaces/office.interface";
import {OfficeService} from "../../core/services/office.service";
import {LanguageService} from "../../core/services/language.service";
import {Language} from "../../core/interfaces/language.interface";
import {Speciality} from "../../core/interfaces/speciality.interface";
import {SpecialityService} from "../../core/services/speciality.service";
import {SinglePageInterface} from "../../core/interfaces/single_page.interface";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-practitioner',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckbox,
    FormsModule,
    MatSelect,
    EditorComponent,
    MatButtonModule,
    MatSnackBarModule,
    NgForOf,
    MatOption
  ],
  templateUrl: './practitioner.component.html',
  styleUrl: './practitioner.component.scss'
})

export class PractitionerComponent extends SingleComponent implements OnInit, OnDestroy, SinglePageInterface {

  private _practitionerService: PractitionerService = inject(PractitionerService);
  private _officeService: OfficeService = inject(OfficeService);
  private _languageService: LanguageService = inject(LanguageService);
  private _specialityService: SpecialityService = inject(SpecialityService);
  subscribedService: Subscription | null = null;
  offices!: Office[];
  languages!: Language[];
  specialities!: Speciality[];

  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount'
  };
  selectedOffice!: number | undefined;
  selectedLanguages: number[] = [];
  selectedSpecialities: number[] = [];

  override ngOnInit(): void {

    this.formService.formGroup = this.formService.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      description: [''],
      active: [''],
      officeId: ['', [Validators.required]],
      languages: ['', [Validators.required]],
      specialities: ['', [Validators.required]],
    });

    super.ngOnInit();

    // get offices
    this._officeService.getAll().subscribe((offices: Office[]) => this.offices = offices);

    // get offices
    this._languageService.getAll().subscribe((languages: Language[]) => this.languages = languages);

    // get offices
    this._specialityService.getAll().subscribe((specialities: Speciality[]) => this.specialities = specialities);


    // check if EDIT Context
    if (this.currentId) {

      this.subscribedService = this._practitionerService.getOne(this.currentId)
        .subscribe((practitioner: Practitioner) => {

          this.singleFormGroup.patchValue(practitioner);

          this.selectedOffice = practitioner.office?.id;

          practitioner.languages?.forEach(language => {

            if (language.id != null) {
              this.selectedLanguages.push(language.id)
            }
          })

          practitioner.specialities?.forEach(speciality => {
            if (speciality.id != null) {

              this.selectedSpecialities.push(speciality.id);

            }
          })

          // set init values
           this.singleFormGroup.get('officeId')?.setValue(this.selectedOffice);
           this.singleFormGroup.get('specialities')?.setValue(this.selectedSpecialities);
           this.singleFormGroup.get('languages')?.setValue(this.selectedLanguages);

            this.isEditContext = true
          }
        );
    }
  }

  onSubmit(event: Event) {

    const practitioner = this.singleFormGroup.value;

    if (!this.isEditContext) {
      this._practitionerService
        .create(practitioner)
        .subscribe({
          next: data => {
            this.formService.snackBar.open({content: 'Practitioner successfully added!'});
            this._router.navigate(['admin', 'practitioners']).then();
          },
          error: err => this.formService.snackBar.open({content: 'error!'})
        })

    } else {
      practitioner.id = this.currentId;

      this._practitionerService.update(practitioner).subscribe({
        next: data => {
          this.formService.snackBar.open({content: 'Practitioner successfully updated!'});
          this._router.navigate(['admin', 'practitioners']).then();
        },
        error: err => this.formService.snackBar.open({content: 'error!'})
      })
    }


  }


  ngOnDestroy(): void {
    if (this.subscribedService) {
      this.subscribedService.unsubscribe();
    }
  }


  onRemove() {

    this.formService.dialog.confirm({
      title: "Confirm delete",
      content: "Are you sure to delete this practitioner"
    }).subscribe({
      next: (confirm: boolean) => {

        if (confirm) {

          this._practitionerService.delete(this.currentId).subscribe({
            next: () => {
              this.formService.snackBar.open({content: "Practitioner was successfully deleted"})
              this._router.navigate(['admin', 'practitioners']).then();
            }
          })
        }

      }
    })

  }

  onReset() {

  }
}

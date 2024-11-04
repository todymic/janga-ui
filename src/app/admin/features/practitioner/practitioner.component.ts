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
import {Control} from "@core/utilities/type";


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

export class PractitionerComponent extends SingleComponent<Practitioner> implements OnInit, OnDestroy, SinglePageInterface {

  private _practitionerService: PractitionerService = inject(PractitionerService);
  private _officeService: OfficeService = inject(OfficeService);
  private _specialityService: SpecialityService = inject(SpecialityService);
  subscribedService: Subscription | null = null;
  offices!: Office[];
  languages!: string[];
  specialities!: Speciality[];
  hide: boolean = true;

  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount'
  };
  selectedOffices: number[] = [];
  selectedLanguages: string[] = [];
  selectedSpecialities: number[] = [];

  override ngOnInit(): void {

    this.formService.formGroup = this.formService.formBuilder.group<Control<Practitioner>>({
      firstname: this.formService.formBuilder.control<string>('', [Validators.required]),
      lastname: this.formService.formBuilder.control<string>('', [Validators.required]),
      email: this.formService.formBuilder.control<string>('', [Validators.required, Validators.email]),
      description: this.formService.formBuilder.control<string>(''),
      active: this.formService.formBuilder.control<boolean>(true),
      offices: this.formService.formBuilder.control<string>('', [Validators.required]),
      languages: this.formService.formBuilder.control<string>('', [Validators.required]),
      specialities: this.formService.formBuilder.control<string>('', [Validators.required]),
      degrees: this.formService.formBuilder.control<string>('', [Validators.required]),
      password: this.formService.formBuilder.control<string>(''),
    });

    super.ngOnInit();

    // get offices
    this._officeService.getAll().subscribe((offices: Office[]) => this.offices = offices);

    // get offices
    this._specialityService.getAll().subscribe((specialities: Speciality[]) => this.specialities = specialities);


    // check if EDIT Context
    if (this.currentId) {

      this.subscribedService = this._practitionerService.getOne(this.currentId)
        .subscribe((practitioner: Practitioner) => {

          this.singleFormGroup.patchValue(practitioner);

          practitioner.offices?.forEach(office => {
            if (office.id != null) {
              this.selectedOffices.push(office.id);
            }
          })

          this.selectedLanguages = practitioner.languages;

          practitioner.specialities?.forEach(speciality => {
            if (speciality.id != null) {

              this.selectedSpecialities.push(speciality.id);

            }
          })

          // set init values
           this.singleFormGroup.controls.offices.setValue(this.selectedOffices);
           this.singleFormGroup.controls.specialities.setValue(this.selectedSpecialities);
           this.singleFormGroup.controls.languages?.setValue(this.selectedLanguages);

            this.isEditContext = true
          }
        );
    }
  }

  onSubmit(event: Event) {

    const practitioner: Practitioner = this.singleFormGroup.value as Practitioner;

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

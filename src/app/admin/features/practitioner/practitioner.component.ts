import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatSelect} from "@angular/material/select";
import {EditorComponent} from "@tinymce/tinymce-angular";
import {MatButtonModule} from '@angular/material/button'
import {ActivatedRoute, Event, Route} from "@angular/router";
import {PractitionerService} from "../../core/services/practitioner.service";
import {Practitioner} from "../../core/interfaces/practitioner.interface";
import {Subscription} from "rxjs";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


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
    MatSnackBarModule
  ],
  templateUrl: './practitioner.component.html',
  styleUrl: './practitioner.component.scss'
})

export class PractitionerComponent implements OnInit, OnDestroy {

  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _practitionerService: PractitionerService = inject(PractitionerService);
  subscribedService: Subscription | null = null;
  private _snackBar = inject(MatSnackBar);

  createForm: FormGroup = this._formBuilder.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    description: [''],
    active: [''],
    office: this._formBuilder.group({
      name: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      country: [''],
    })
  });
  route: ActivatedRoute = inject(ActivatedRoute);
  currentId!: number | null;
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount'
  };

  constructor() {
  }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : null;
    if(this.currentId) {
      this.subscribedService = this._practitionerService.getOne(this.currentId).subscribe(
        (practitioner: Practitioner) => {
          this.createForm.patchValue(practitioner)
        });
    }
  }

  onSubmit(event: Event) {

    const practitioner = this.createForm.value;
    practitioner.specialities = null;
    practitioner.languages = { name: 'francais', code: 'FR' };

    if(!this.currentId) {
      this._practitionerService.create(practitioner).subscribe({
        next: data => this._snackBar.open('Practitioner successfully added', 'Undo', { duration: 3000}),
        error: err => this._snackBar.open('error'),
        complete: () => {}
      })

    } else {
      practitioner.id = this.currentId;

      this._practitionerService.update(practitioner).subscribe({
        next: data => this._snackBar.open('Practitioner successfully updated', 'Undo', { duration: 3000}),
        error: err => this._snackBar.open('error'),
        complete: () => {}
      })
    }


  }

  isValidField(lastname: string): boolean | undefined {
    const field = this.createForm.get(lastname);
    return field?.invalid && (field?.dirty || field?.touched);
  }

  ngOnDestroy(): void {
    if(this.subscribedService) {
      this.subscribedService.unsubscribe();
    }
  }



}

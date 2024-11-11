import {ChangeDetectionStrategy, Component, computed, inject, OnInit, Signal, signal} from '@angular/core';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton, MatIconButton} from "@angular/material/button";
import {BaseFormService} from "@admin/core/services/base-form.service";
import {SearchService} from "@core/services/search.service";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {map, Observable, of, startWith, Subject, switchMap} from 'rxjs';
import {AsyncPipe} from "@angular/common";
import {Control} from "@core/utilities/type";
import {Search} from '@core/models';
import {SearchPractitionerResponse, SearchResponse, SearchSpecialityResponse} from "@core/utilities/search-response";
import {toSignal} from "@angular/core/rxjs-interop";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatIcon,
    FormsModule,
    MatFormField,
    MatInput,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckbox,
    MatButton,
    MatIconButton,
    MatAutocompleteModule,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchComponent implements OnInit {

  protected formService: BaseFormService = inject(BaseFormService);
  protected searchService: SearchService = inject(SearchService);
  private _router: Router = inject(Router);

  specialities = signal<SearchSpecialityResponse[]>([]);
  filteredSpecialityOptions = computed(() => this.specialities());

  searchGroup!: FormGroup<Control<Search>>;
  filteredPractitionerOptions!: Observable<SearchResponse[]>;
  practitionerOrOffice: Subject<string> = new Subject();

  ngOnInit(): void {

    this.searchGroup = this.formService.formBuilder.group<Control<Search>>({
      searchPractitioner: this.formService.formBuilder.control<string>(''),
      searchSpeciality: this.formService.formBuilder.control<string>(''),
    });

    // get all Specialities
    this.searchService.findAvailableSpecialities()
      .subscribe((specialities: SearchSpecialityResponse[]) => {
        this.specialities.set(specialities);
      })

    // options filtered form API
    this.filteredPractitionerOptions = this.practitionerOrOffice.pipe(
      switchMap(value => (value && value.length > 2) ? this.searchService.findPractitionerOrOffice(value) : of([])),
    );

    //Subscriptions
    // On change the input searchPractitioner, call search API
    this.searchGroup.controls.searchPractitioner.valueChanges
      .subscribe((value: string) => {
        this.practitionerOrOffice.next(value);
      })


    //on change speciality
    this.searchGroup.controls.searchSpeciality.valueChanges.pipe(
        startWith(''),
        map((value: any) => {
          const name = typeof value === 'string' ? value : value?.name;

          const filteredOptions =  name ? this._filterSpecialityOptions(value) : this.specialities().slice();

          this.specialities.set(filteredOptions);

        })
      ).subscribe()
  }


  onSubmit($event: any) {

  }

  displaySpecialityFn(speciality: SearchSpecialityResponse) {
    return speciality ? speciality.name : '';
  }

  displayPractitionerFn(value: SearchPractitionerResponse) {
    return value ? value.name : '';
  }

  private _filterSpecialityOptions(value: any): SearchSpecialityResponse[] {
    const name: string = value.toLowerCase();
    return this.specialities().filter((option: any) => option.name.toLowerCase().includes(name));
  }

  onSelectPractitioner(id: number) {
    this._router.navigate(['practitioners', id]).then();

  }
}

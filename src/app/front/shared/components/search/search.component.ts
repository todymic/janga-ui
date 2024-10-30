import {
  ChangeDetectionStrategy,
  Component,
  computed, effect,
  inject,
  OnInit,
  Signal,
  signal
} from '@angular/core';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton, MatIconButton} from "@angular/material/button";
import {BaseFormService} from "../../../../admin/core/services/base-form.service";
import {SearchService} from "@core/services/search.service";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {map, Observable, of, startWith, Subject, switchMap} from 'rxjs';
import {AsyncPipe} from "@angular/common";
import {Control} from "@core/utilities/type";
import {Search} from '@core/models';
import {SearchPractitionerResponse, SearchResponse, SearchSpecialityResponse} from "@core/utilities/search-response";

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
    AsyncPipe
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchComponent implements OnInit {

  protected formService: BaseFormService = inject(BaseFormService);
  protected searchService: SearchService = inject(SearchService);

  searchGroup!: FormGroup<Control<Search>>;
  searchSpecialityOptions: SearchSpecialityResponse[] = [];
  filteredSpecialityOptions!: Observable<SearchResponse[] >;
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
        this.searchSpecialityOptions = specialities;
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
    this.filteredSpecialityOptions = this.searchGroup.controls.searchSpeciality.valueChanges.pipe(
      startWith(''),
      map((value: any): SearchSpecialityResponse[] => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterSpecialityOptions(value) : this.searchSpecialityOptions.slice();
      })
    );


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
    return this.searchSpecialityOptions.filter((option: any) => option.name.toLowerCase().includes(name));
  }
}

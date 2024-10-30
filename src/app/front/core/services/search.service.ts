import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map, Observable, tap} from "rxjs";
import {SearchPractitionerResponse, SearchResponse, SearchSpecialityResponse} from "@core/utilities/search-response";


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  http: HttpClient = inject(HttpClient);

  constructor() {
  }

  findPractitionerOrOffice(search: string): Observable<SearchPractitionerResponse[]> {
    return this.http.get<SearchPractitionerResponse[]>(environment.apiUrl + 'search/practitioners?term=' + search).pipe(
      map((res: SearchPractitionerResponse[]) => res)
    )
  }

  findAvailableSpecialities(): Observable<SearchSpecialityResponse[]> {
    return this.http.get<SearchSpecialityResponse[]>(environment.apiUrl + 'search/specialities').pipe(
      map((res: SearchSpecialityResponse[]) => res)
    )
  }
}

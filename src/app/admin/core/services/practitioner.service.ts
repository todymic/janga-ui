import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap, Observable, Subject} from "rxjs";
import {
  GetPractitionerResponse,
  GetPractitionersResponse,
  StatusExceptedResponse
} from "../interfaces/response.interface";
import {Practitioner} from "@admin/core/interfaces/practitioner.interface";


interface CrudPractitioner {
  getAll(): Observable<Practitioner[]>;
  getOne(id: number): Observable<Practitioner>;
  create(practitioner: Practitioner): Observable<Practitioner>;
  delete(id: number): Observable<boolean>;
  update(updatedData: Practitioner): Observable<Practitioner>;
}

@Injectable({
  providedIn: 'root'
})
export class PractitionerService implements CrudPractitioner {

  BASE_URL = "http://127.0.0.1:3000/api/practitioners";
  http: HttpClient = inject(HttpClient);

  private _data: Subject<Practitioner[]> = new Subject<Practitioner[]>();

  public get data(): Observable<Practitioner[]> {
   return this._data.asObservable();
  }

  getAll(): Observable<Practitioner[]> {
   return  this.http.get<GetPractitionersResponse>(this.BASE_URL).pipe(
      tap(response => this._data.next(response.practitioners)),
      map((response: GetPractitionersResponse) => {
        return response.practitioners;
      })
    );
  }

  getOne(id: number): Observable<Practitioner> {
    return this.http.get<GetPractitionerResponse>(this.BASE_URL + '/' + id ).pipe(
      map((response: GetPractitionerResponse) => {
        return response.practitioner;
      })
    );

  }

  create(practitioner: Practitioner): Observable<Practitioner> {
    return this.http.post<GetPractitionerResponse>(this.BASE_URL + '/new', practitioner).pipe(
      map((response: GetPractitionerResponse)=> response.practitioner)
    )
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<StatusExceptedResponse>(this.BASE_URL + '/' + id).pipe(
      map((response: StatusExceptedResponse)=> response.status)
    );
  }

  update(updatedPractitioner: Practitioner): Observable<Practitioner> {
    return this.http.put<GetPractitionerResponse>(this.BASE_URL + '/' + updatedPractitioner.id, updatedPractitioner).pipe(
      map((response: GetPractitionerResponse)=> response.practitioner)
    );
  }
}

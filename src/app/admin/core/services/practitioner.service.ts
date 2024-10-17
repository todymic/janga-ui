import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Practitioner, Practitioner as IPractitioner} from "../interfaces/practitioner.interface";
import {map, tap, Observable, Subject} from "rxjs";
import {
  GetPractitionerResponse,
  GetPractitionersResponse,
  StatusExceptedResponse
} from "../interfaces/response.interface";


interface CrudPractitioner {
  getAll(): Observable<IPractitioner[]>;
  getOne(id: number): Observable<IPractitioner>;
  create(practitioner: IPractitioner): Observable<IPractitioner>;
  delete(id: number): Observable<boolean>;
  update(updatedData: IPractitioner): Observable<IPractitioner>;
}

@Injectable({
  providedIn: 'root'
})
export class PractitionerService implements CrudPractitioner {

  BASE_URL = "http://127.0.0.1:3000/api/practitioners";
  http: HttpClient = inject(HttpClient);

  private _data: Subject<IPractitioner[]> = new Subject<IPractitioner[]>();

  constructor() {
  }

  public get data(): Observable<IPractitioner[]> {
   return this._data.asObservable();
  }

  getAll(): Observable<IPractitioner[]> {
   return  this.http.get<GetPractitionersResponse>(this.BASE_URL).pipe(
      tap(response => this._data.next(response.practitioners)),
      map((response: GetPractitionersResponse) => {
        return response.practitioners;
      })
    );
  }

  getOne(id: number): Observable<IPractitioner> {
    return this.http.get<GetPractitionerResponse>(this.BASE_URL + '/' + id + '/profile').pipe(
      map((response: GetPractitionerResponse) => {
        return response.practitioner;
      })
    );

  }

  create(practitioner: IPractitioner): Observable<IPractitioner> {
    return this.http.post<GetPractitionerResponse>(this.BASE_URL + '/new', practitioner).pipe(
      map((response: GetPractitionerResponse)=> response.practitioner)
    )
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<StatusExceptedResponse>(this.BASE_URL + '/' + id).pipe(
      map((response: StatusExceptedResponse)=> response.status)
    );
  }

  update(updatedPractitioner: IPractitioner): Observable<IPractitioner> {
    return this.http.put<GetPractitionerResponse>(this.BASE_URL + '/' + updatedPractitioner.id, updatedPractitioner).pipe(
      map((response: GetPractitionerResponse)=> response.practitioner)
    );
  }
}

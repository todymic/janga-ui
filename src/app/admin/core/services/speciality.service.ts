import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Speciality as ISpeciality} from "../interfaces/speciality.interface";
import {map, tap, Observable, Subject} from "rxjs";
import {
  GetSpecialityResponse,
  GetSpecialitiesResponse,
  StatusExceptedResponse
} from "../interfaces/response.interface";


interface CrudSpeciality {
  getAll(): Observable<ISpeciality[]>;
  getOne(id: number): Observable<ISpeciality>;
  create(speciality: ISpeciality): Observable<ISpeciality>;
  delete(id: number): Observable<boolean>;
  update(updatedData: ISpeciality): Observable<ISpeciality>;
}

@Injectable({
  providedIn: 'root'
})
export class SpecialityService implements CrudSpeciality {

  BASE_URL = "http://127.0.0.1:3000/api/specialities";
  http: HttpClient = inject(HttpClient);

  private _data: Subject<ISpeciality[]> = new Subject<ISpeciality[]>();

  constructor() {
  }

  public get data(): Observable<ISpeciality[]> {
    return this._data.asObservable();
  }

  getAll(): Observable<ISpeciality[]> {
    return  this.http.get<GetSpecialitiesResponse>(this.BASE_URL).pipe(
      tap(response => this._data.next(response.specialities)),
      map((response: GetSpecialitiesResponse) => {
        return response.specialities;
      })
    );
  }

  getOne(id: number): Observable<ISpeciality> {
    return this.http.get<GetSpecialityResponse>(this.BASE_URL + '/' + id ).pipe(
      map((response: GetSpecialityResponse) => {
        return response.speciality;
      })
    );

  }

  create(speciality: ISpeciality): Observable<ISpeciality> {
    return this.http.post<GetSpecialityResponse>(this.BASE_URL + '/new', speciality).pipe(
      map((response: GetSpecialityResponse)=> response.speciality)
    )
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<StatusExceptedResponse>(this.BASE_URL + '/' + id).pipe(
      map((response: StatusExceptedResponse)=> response.status)
    );
  }

  update(updatedSpeciality: ISpeciality): Observable<ISpeciality> {
    return this.http.put<GetSpecialityResponse>(this.BASE_URL + '/' + updatedSpeciality.id, updatedSpeciality).pipe(
      map((response: GetSpecialityResponse)=> response.speciality)
    );
  }
}

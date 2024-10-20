import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Office, Office as IOffice} from "../interfaces/office.interface";
import {map, tap, Observable, Subject} from "rxjs";
import {
  GetOfficeResponse,
  GetOfficesResponse,
  StatusExceptedResponse
} from "../interfaces/response.interface";


interface CrudOffice {
  getAll(): Observable<IOffice[]>;
  getOne(id: number): Observable<IOffice>;
  create(office: IOffice): Observable<IOffice>;
  delete(id: number): Observable<boolean>;
  update(updatedData: IOffice): Observable<IOffice>;
}

@Injectable({
  providedIn: 'root'
})
export class OfficeService implements CrudOffice {

  BASE_URL = "http://127.0.0.1:3000/api/offices";
  http: HttpClient = inject(HttpClient);

  private _data: Subject<IOffice[]> = new Subject<IOffice[]>();

  constructor() {
  }

  public get data(): Observable<IOffice[]> {
    return this._data.asObservable();
  }

  getAll(): Observable<IOffice[]> {
    return  this.http.get<GetOfficesResponse>(this.BASE_URL).pipe(
      tap(response => this._data.next(response.offices)),
      map((response: GetOfficesResponse) => {
        return response.offices;
      })
    );
  }

  getOne(id: number): Observable<IOffice> {
    return this.http.get<GetOfficeResponse>(this.BASE_URL + '/' + id ).pipe(
      map((response: GetOfficeResponse) => {
        return response.office;
      })
    );

  }

  create(office: IOffice): Observable<IOffice> {
    return this.http.post<GetOfficeResponse>(this.BASE_URL + '/new', office).pipe(
      map((response: GetOfficeResponse)=> response.office)
    )
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<StatusExceptedResponse>(this.BASE_URL + '/' + id).pipe(
      map((response: StatusExceptedResponse)=> response.status)
    );
  }

  update(updatedOffice: IOffice): Observable<IOffice> {
    return this.http.put<GetOfficeResponse>(this.BASE_URL + '/' + updatedOffice.id, updatedOffice).pipe(
      map((response: GetOfficeResponse)=> response.office)
    );
  }
}

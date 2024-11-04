import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Language as ILanguage} from "../interfaces/language.interface";
import {map, tap, Observable, Subject} from "rxjs";
import {
  GetLanguageResponse,
  GetLanguagesResponse,
  StatusExceptedResponse
} from "../interfaces/response.interface";


interface CrudLanguage {
  getAll(): Observable<ILanguage[]>;
  getOne(id: number): Observable<ILanguage>;
  create(language: ILanguage): Observable<ILanguage>;
  delete(id: number): Observable<boolean>;
  update(updatedData: ILanguage): Observable<ILanguage>;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  BASE_URL = "http://127.0.0.1:3000/api/languages";
  http: HttpClient = inject(HttpClient);

  private _data: Subject<ILanguage[]> = new Subject<ILanguage[]>();

  constructor() {
  }

  public get data(): Observable<ILanguage[]> {
    return this._data.asObservable();
  }

  getAll(): Observable<ILanguage[]> {
    return  this.http.get<GetLanguagesResponse>(this.BASE_URL).pipe(
      tap(response => this._data.next(response.languages)),
      map((response: GetLanguagesResponse) => {
        return response.languages;
      })
    );
  }

  getOne(id: number): Observable<ILanguage> {
    return this.http.get<GetLanguageResponse>(this.BASE_URL + '/' + id ).pipe(
      map((response: GetLanguageResponse) => {
        return response.language;
      })
    );

  }

  create(language: ILanguage): Observable<ILanguage> {
    return this.http.post<GetLanguageResponse>(this.BASE_URL + '/new', language).pipe(
      map((response: GetLanguageResponse)=> response.language)
    )
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<StatusExceptedResponse>(this.BASE_URL + '/' + id).pipe(
      map((response: StatusExceptedResponse)=> response.status)
    );
  }

  update(updatedLanguage: ILanguage): Observable<ILanguage> {
    return this.http.put<GetLanguageResponse>(this.BASE_URL + '/' + updatedLanguage.id, updatedLanguage).pipe(
      map((response: GetLanguageResponse)=> response.language)
    );
  }
}

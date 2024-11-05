import {HttpClient} from "@angular/common/http";
import {computed, inject, Injectable, Injector, signal} from "@angular/core";
import {Router} from "@angular/router";
import {AuthRequest} from "@core/services/interface/auth-request";
import {Observable, tap} from "rxjs";
import {AuthResponse} from "@core/services/interface/auth-response";
import {Auth} from "@core/services/interface/auth";
import {LoginRequest} from "@core/services/interface/login-request";
import {RegisterRequest} from "@core/services/interface/register-request";

export abstract class AuthService implements Auth {
  protected _http: HttpClient = inject(HttpClient);
  protected _router: Router = inject(Router);
  protected _authData = signal<AuthResponse | null>(null);
  protected _sessionKey: string = '';
  protected _loginUrl: string = '';
  protected _registerUrl: string = '';
  protected _redirectPathAfterLogout!: string[];


  isAuthenticated = computed(() => {
    this._authData();
    return !!this.sessionData('token');
  });

  // Protected functions
  sessionHandler(response: AuthResponse): void {
    if(typeof localStorage !== 'undefined') {
      localStorage.setItem(this._sessionKey, JSON.stringify(response));
    }
  }

  protected removeSession() {
    localStorage.removeItem(this._sessionKey);
  }


  sessionData(name: string): string | null | unknown {
    if(typeof localStorage !== 'undefined') {

      const sessionItem: string | null =  localStorage.getItem(this._sessionKey);

      if(sessionItem){
        const sessionDataObject: any = JSON.parse(sessionItem);

        if(sessionDataObject.hasOwnProperty(name)) {
         return sessionDataObject[name];
        }
      }
    }

    return null;
  }

  protected sendAuthRequest(url: string, data: AuthRequest): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(url, data).pipe(
      tap((response) => {

        this._authData.set(response);

        this.sessionHandler(response);
      })
    )
  }


  // Public functions
  logout(): void {
    this.removeSession();
    this._authData.set(null);
    this._router.navigate(this._redirectPathAfterLogout).then()
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.sendAuthRequest(this._loginUrl, data);
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.sendAuthRequest(this._registerUrl, data);
  }


}

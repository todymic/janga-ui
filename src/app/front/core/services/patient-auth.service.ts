import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {AuthResponse} from "@core/services/interface/auth-response";
import {AuthRequest} from "@core/services/interface/auth-request";
import {Patient} from "@core/models/patient";
import {LoginRequest} from "@core/services/interface/login-request";
import {environment} from "@environment/environment";
import {PractitionerRegisterRequest} from "@core/services/interface/practitioner-register-request";
import {Auth} from "@core/services/interface/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PatientAuthService implements Auth {

  protected _http: HttpClient = inject(HttpClient);
  protected _router: Router = inject(Router);

  protected _patient = signal<Patient | null>(null);
  private _token = signal<string | null>(null);

  isAuthenticated = computed(() => {
    this._patient();
    return !!this.sessionData('patient');
  });

  sessionHandler(token: string, patient: Patient) {
    if(typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('patient', JSON.stringify(patient));
    }
  }
  removeSession() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('patient');
  }

  sessionData(name: string): string | null {
    if(typeof sessionStorage !== 'undefined') {

      const sessionItem: string =  sessionStorage.getItem(name) as string;

      if(sessionItem) {
        return name === 'token' ? sessionItem: JSON.parse(sessionItem);
      }
    }

    return null;
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    const url = environment.apiUrl + 'patients/login';
    return this.sendAuthRequest(url, data);
  }

  register(data: PractitionerRegisterRequest): Observable<AuthResponse> {
    const url = environment.apiUrl + 'patients/register';
    return this.sendAuthRequest(url, data);
  }


  logout() {
    this.removeSession();

    this._token.set(null);
    this._patient.set(null);

    this._router.navigate(['/']).then();
  }


  protected sendAuthRequest(url: string, data: AuthRequest): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(url, data).pipe(
      tap((response) => {
        this._patient.set(response.user);
        this._token.set(response.token);

        this.sessionHandler(response.token, response.user);
      })
    )
  }
}

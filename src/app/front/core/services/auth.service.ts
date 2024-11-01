import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {retry, tap} from "rxjs";
import {AuthResponse} from "@core/services/interface/auth-response";
import {Model} from "@core/models/interface/model.interface";
import {AuthRequest} from "@core/services/interface/auth-request";
import {Patient} from "@core/models/patient";
import {LoginRequest} from "@core/services/interface/login-request";
import {environment} from "@environment/environment";
import {PractitionerRegisterRequest} from "@core/services/interface/practitioner-register-request";

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private _http: HttpClient = inject(HttpClient);
  protected _patientSign = signal<Patient | null>(null);
  private _token = signal<string | null>(null);
  currentPatient = this._patientSign.asReadonly();
  isAuthenticated = computed(() => this.currentPatient() !== null);
  isTokenValid = computed(() => this._token() !== null);

  sessionToken: Signal<string|null> = computed((): string|null => {
    if(this.isTokenValid()) {
      localStorage.setItem('token', <string>this._token());
      return this._token();
    } else {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
    }

    return null;
  });

  login(data: LoginRequest) {
    const url = environment.apiUrl + 'patients/login';
    this.sendAuthRequest(url, data);
  }

  register(data: PractitionerRegisterRequest): void {
    const url = environment.apiUrl + 'patients/register';
  }


  logout(): void {
    this._token.set(null);
  }


  protected sendAuthRequest(url: string, data: AuthRequest) {
    this._http.post<AuthResponse>(url, data).pipe(
      tap((response) => {
        this._patientSign.set(response.user);
        this._token.set(response.token);
      })
    )
  }
}

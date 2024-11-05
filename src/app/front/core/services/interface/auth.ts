import {LoginRequest} from "@core/services/interface/login-request";
import {RegisterRequest} from "@core/services/interface/register-request";
import {Observable} from "rxjs";
import {AuthResponse} from "@core/services/interface/auth-response";
export interface Auth {
  login(data: LoginRequest): Observable<AuthResponse>;
  isAuthenticated(): boolean;
  logout(): void;
  register(data: RegisterRequest): Observable<AuthResponse>;
}

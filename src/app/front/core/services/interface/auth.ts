import {LoginRequest} from "@core/services/interface/login-request";
import {RegisterRequest} from "@core/services/interface/register-request";
export interface Auth {

  login(data: LoginRequest): void;
  isAuthenticated(): boolean;
  logout(): void;
  register(data: RegisterRequest): void;
}

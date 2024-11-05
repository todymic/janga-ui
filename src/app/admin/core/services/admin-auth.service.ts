import { Injectable } from '@angular/core';
import {AuthService} from "@admin/core/services/auth.service";
import {environment} from "@environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService extends AuthService  {

  protected override _sessionKey: string = 'authenticated_admin';
  protected override _loginUrl: string = environment.apiUrl + 'users/login';
  protected override _registerUrl: string = environment.apiUrl + 'users/register';
  protected override _redirectPathAfterLogout: string[] = ['admin', 'login'];

}

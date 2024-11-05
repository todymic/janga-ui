import {Injectable} from '@angular/core';
import {environment} from "@environment/environment";
import {AuthService} from "@admin/core/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PatientAuthService extends AuthService {

  override _sessionKey: string = 'authenticated_patient';
  override _loginUrl: string = environment.apiUrl + 'patients/login';
  override _registerUrl: string = environment.apiUrl + 'patients/register';
  override _redirectPathAfterLogout = [''];

}

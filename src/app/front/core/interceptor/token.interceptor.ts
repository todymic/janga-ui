import {HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {PatientAuthService} from "@core/services/patient-auth.service";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(PatientAuthService);
  const token = authService.sessionData('token');

  if(!token) {
    return next(req);
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  })

  const newReq = req.clone({
    headers
  });

  return next(newReq);
};

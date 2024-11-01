import {HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "@core/services/auth.service";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if(!authService.isTokenValid()) {
    return next(req);
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${authService.sessionToken()}`
  })

  const newReq = req.clone({
    headers
  });


  return next(newReq);
};

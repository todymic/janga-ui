import {HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AdminAuthService} from "@admin/core/services/admin-auth.service";

export const adminAuthInterceptor: HttpInterceptorFn = (req, next) => {

  const authServer = inject(AdminAuthService);

    if(authServer.isAuthenticated()) {

        const token = authServer.sessionData('token');

        let headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });

        const newReq = req.clone({ headers });

       return next(newReq);
    }

  return next(req);
};

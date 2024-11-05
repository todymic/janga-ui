import {ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {AdminAuthService} from "@admin/core/services/admin-auth.service";

export const dashboardGuard: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const authService = inject(AdminAuthService);
  const router = inject(Router);

  if(!authService.isAuthenticated()) {
       router.navigate(['admin', 'login']).then();
       return false;
  }

  return true;
};

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const routeGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  if (route?.queryParams['email'] || route?.queryParams['code']) return true
  else {
    router.navigate(['/home'])
    return false;
  }
};

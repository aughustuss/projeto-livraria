import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if (auth.isLoggedIn()) return true
  else {
    router.navigate(['login']);
    return false
  }
};

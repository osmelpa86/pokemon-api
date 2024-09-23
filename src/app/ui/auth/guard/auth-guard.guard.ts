import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../../../core/util/token-storage.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenStorageService);
  const router = inject(Router);
  const user = tokenService.getUser();
  if (user) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

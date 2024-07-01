import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const protectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/login'])
  }
  return true;
};

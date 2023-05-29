import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authToken = inject(CookieService).get('token');
  const router = inject(Router);

  if (authToken) {
    // O cookie de autenticação existe, o usuário está autenticado
    return true;
  } else {
    // O cookie de autenticação não existe, redirecionar para a página de login
    router.navigate(['/auth/login']);
    return false;
  }
};

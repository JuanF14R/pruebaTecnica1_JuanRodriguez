import { CanActivateFn } from '@angular/router';
import { LoginServiceService } from '../service/login.service.service';
import { inject, Inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const _LoginServiceService = inject( LoginServiceService);
  const _router = inject(Router);

  if (!_LoginServiceService.estaLogueado()){
    _router.navigate(['/login']);
    return false;
  }

  return true;
};

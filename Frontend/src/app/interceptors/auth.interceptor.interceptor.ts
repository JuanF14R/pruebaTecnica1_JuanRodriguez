import { HttpInterceptorFn } from '@angular/common/http';
import { LoginServiceService } from '../service/login.service.service';
import { inject, Inject } from '@angular/core';


export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const _LoginServiceService = inject(LoginServiceService);

  const token = _LoginServiceService.obtenerToken();

  const tokenReq = token ?
    req.clone({setHeaders: {authorization: 'Bearer' + token}}) : req;

  return next(req);
};

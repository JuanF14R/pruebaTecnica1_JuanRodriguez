import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { authInterceptorInterceptor } from './interceptors/auth.interceptor.interceptor';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: 
  [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient( withInterceptors([ authInterceptorInterceptor])),
    provideToastr({
      timeOut: 2000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
      easeTime: 0,
      progressBar: false,
    }),
    provideAnimations(),
  ]
};

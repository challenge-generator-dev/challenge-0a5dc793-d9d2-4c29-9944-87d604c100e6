import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { orderEventReducer } from './core/store/order-event.reducer';
import { OrderEventEffects } from './core/store/order-event.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions()
    ),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),
    provideAnimationsAsync(),
    {
      provide: 'SSE_CONFIG',
      useValue: {
        reconnectInterval: 3000,
        maxRetries: 5,
        eventType: 'order-update'
      }
    },
    {
      provide: 'API_CONFIG',
      useValue: {
        baseUrl: 'http://localhost:3000',
        timeout: 30000,
        retryAttempts: 3
      }
    }
  ]
};

if (isDevMode()) {
  console.log('Modo desarrollo activo - habilitando herramientas de debugging');
}
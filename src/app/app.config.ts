import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideKeycloakAngular } from './core/auth/keycloak.provider';
import { authBearerInterceptor } from './core/auth/auth-bearer.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([authBearerInterceptor])),
    provideOAuthClient(),
    // angular-oauth2-oidc only runs in the browser — this file is only
    // evaluated in the browser bundle (app.config.server.ts merges its own
    // server-only config on top for SSR and never imports these providers
    // directly into that path).
    ...provideKeycloakAngular(),
  ],
};

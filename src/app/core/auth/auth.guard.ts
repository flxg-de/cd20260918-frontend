import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

/**
 * Route guard requiring an authenticated OIDC session. Unauthenticated
 * users are redirected to the app root rather than forced into a login
 * redirect for the whole app.
 */
export const authGuard: CanActivateFn = () => {
  const oauthService = inject(OAuthService);

  if (oauthService.hasValidAccessToken()) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('/');
};

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { from, switchMap } from 'rxjs';
import { isInvalidGrantError } from './invalid-grant';

/**
 * URL pattern matching this application's own API origin. The bearer token
 * is only attached to requests matching this pattern — never to third-party
 * requests.
 */
const API_URL_PATTERN = /^\/api\/v1(\/.*)?$/i;

/**
 * Attaches the current OIDC access token to requests targeting this app's
 * own backend. angular-oauth2-oidc doesn't ship a scoped interceptor the way
 * keycloak-angular's bearer condition config did, so this replicates the
 * same URL-based scoping.
 *
 * The automatic silent refresh timer can miss a renewal (tab was suspended,
 * the refresh call failed, …), which would otherwise leave an expired
 * access token in storage. This checks expiry on every outgoing request and
 * refreshes synchronously before attaching the header, instead of trusting
 * whatever `getAccessToken()` last cached.
 */
export const authBearerInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window === 'undefined' || !API_URL_PATTERN.test(req.url)) {
    return next(req);
  }

  const oauthService = inject(OAuthService);

  const ensureValidToken = oauthService.hasValidAccessToken()
    ? Promise.resolve(oauthService.getAccessToken())
    : oauthService
        .refreshToken()
        .then(() => oauthService.getAccessToken())
        .catch((error: unknown) => {
          // The refresh token itself can be expired/revoked server-side
          // (Keycloak replies with invalid_grant / "Token is not active").
          // Retrying with the same stale refresh token would just repeat
          // the 400, so drop everything angular-oauth2-oidc cached in
          // localStorage and send the user through a fresh login instead.
          if (isInvalidGrantError(error)) {
            oauthService.logOut(true);
            oauthService.initLoginFlow();
          }
          return undefined;
        });

  return from(ensureValidToken).pipe(
    switchMap((token) => {
      const authReq = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;
      return next(authReq);
    }),
  );
};

import { EnvironmentProviders, inject, Provider, provideAppInitializer } from '@angular/core';
import { OAuthService, AuthConfig, OAuthErrorEvent } from 'angular-oauth2-oidc';
import { isInvalidGrantError } from './invalid-grant';

/**
 * OIDC config for Keycloak's `slot-manager` realm / `slot-manager-frontend`
 * public client. Authorization Code + PKCE, matching the Keycloak client's
 * configured redirect URIs (`http://localhost:4200/*`).
 */
const authConfig: AuthConfig = {
  issuer: 'http://localhost:8081/realms/slot-manager',
  clientId: 'slot-manager-frontend',
  responseType: 'code',
  redirectUri: typeof window !== 'undefined' ? window.location.origin : '',
  scope: 'openid profile email',
  showDebugInformation: false,
};

/**
 * angular-oauth2-oidc initialization providers. It only works in the
 * browser, so this must only be included in the browser `ApplicationConfig`
 * — never merged into the server config used for SSR.
 */
export function provideKeycloakAngular(): (EnvironmentProviders | Provider)[] {
  // angular-oauth2-oidc requires browser globals (window, document) and must
  // never run during SSR. app.config.ts is shared between the browser and
  // server bundles, so this guard keeps SSR builds/renders from breaking.
  if (typeof window === 'undefined') {
    return [];
  }

  return [
    provideAppInitializer(() => {
      const oauthService = inject(OAuthService);
      oauthService.configure(authConfig);

      // setupAutomaticSilentRefresh() runs its own refresh calls on a timer,
      // independent of any HTTP interceptor. When the refresh token itself
      // is no longer usable (session deleted/expired server-side), that
      // refresh fails with invalid_grant and — left unhandled — just leaves
      // the stale tokens sitting in localStorage, so every subsequent
      // attempt (including on page reload) fails the same way. Clear
      // storage and restart the login flow as soon as that happens.
      oauthService.events.subscribe((event) => {
        if (event.type === 'token_refresh_error' && isInvalidGrantError((event as OAuthErrorEvent).reason)) {
          oauthService.logOut(true);
          oauthService.initLoginFlow();
        }
      });

      oauthService.setupAutomaticSilentRefresh();
      return oauthService.loadDiscoveryDocumentAndTryLogin();
    }),
  ];
}

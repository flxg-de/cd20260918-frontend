import { computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OAuthService } from 'angular-oauth2-oidc';

/**
 * Realm role assumed to mark a user as an organizer ("ORGANISATOR" per the
 * spec's role naming). Gates organizer-only actions in the UI only —
 * the backend independently enforces this on every organizer-only endpoint.
 *
 * Keycloak issues this role lowercased (`"organisator"`) even though the API
 * spec spells it `ORGANISATOR`, so the comparison below is case-insensitive.
 */
const ORGANIZER_REALM_ROLE = 'organisator';

/**
 * Decodes the payload of a JWT without verifying its signature. Verification
 * happens server-side on every request; this is only used to read claims for
 * UI gating.
 */
function decodeJwtPayload(token: string): unknown {
  const payload = token.split('.')[1];
  if (!payload) {
    return undefined;
  }
  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  return JSON.parse(atob(padded));
}

/**
 * Reads whether the current OIDC session carries the organizer realm role.
 * Must be called from an injection context (component/service field
 * initializer or constructor), same as other OAuth-dependent signals in this
 * app (see `App.authenticated`).
 *
 * Per the API spec, the role (`REFERENT`/`ORGANISATOR`) is carried in the
 * *access* token's `realm_access.roles`, not the ID token — Keycloak doesn't
 * necessarily mirror realm roles into the ID token depending on client scope
 * mapper config, so this must decode the access token rather than use
 * `getIdentityClaims()`.
 */
export function injectIsOrganizer(): Signal<boolean> {
  const oauthService = inject(OAuthService, { optional: true });
  const oauthEvent = oauthService ? toSignal(oauthService.events, { initialValue: null }) : null;

  return computed(() => {
    oauthEvent?.();
    const accessToken = oauthService?.getAccessToken();
    if (!accessToken) {
      return false;
    }
    const claims = decodeJwtPayload(accessToken) as { realm_access?: { roles?: string[] } } | undefined;
    return (
      claims?.realm_access?.roles?.some((role) => role.toLowerCase() === ORGANIZER_REALM_ROLE) ?? false
    );
  });
}

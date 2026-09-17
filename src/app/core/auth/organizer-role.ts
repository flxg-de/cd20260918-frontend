import { computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OAuthService } from 'angular-oauth2-oidc';

/**
 * Realm role assumed to mark a user as an organizer ("ORGANISATOR" per the
 * spec's role naming). Gates organizer-only actions in the UI only —
 * the backend independently enforces this on every organizer-only endpoint.
 */
const ORGANIZER_REALM_ROLE = 'ORGANISATOR';

/**
 * Reads whether the current OIDC session carries the organizer realm role.
 * Must be called from an injection context (component/service field
 * initializer or constructor), same as other OAuth-dependent signals in this
 * app (see `App.authenticated`).
 *
 * NOTE: this reads `realm_access.roles` off the parsed identity token claims,
 * which is Keycloak's default realm-role claim shape. This was not verified
 * against a real Keycloak token issued through the new angular-oauth2-oidc
 * flow — confirm the claim is still present/named the same before relying on
 * this for anything beyond UI gating.
 */
export function injectIsOrganizer(): Signal<boolean> {
  const oauthService = inject(OAuthService, { optional: true });
  const oauthEvent = oauthService ? toSignal(oauthService.events, { initialValue: null }) : null;

  return computed(() => {
    oauthEvent?.();
    const claims = oauthService?.getIdentityClaims() as
      | { realm_access?: { roles?: string[] } }
      | undefined;
    return claims?.realm_access?.roles?.includes(ORGANIZER_REALM_ROLE) ?? false;
  });
}

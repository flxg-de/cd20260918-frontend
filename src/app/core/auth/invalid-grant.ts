import { OAuthErrorEvent } from 'angular-oauth2-oidc';

/**
 * The OAuth2 error body Keycloak's token endpoint returns, e.g.
 * `{ error: 'invalid_grant', error_description: 'Invalid refresh token' }`.
 */
interface OAuth2ErrorBody {
  error?: string;
}

/**
 * angular-oauth2-oidc's `refreshToken()` rejects its promise with the *raw*
 * `HttpErrorResponse` from the failed token request — not with an
 * `OAuthErrorEvent`. Its `.error` property holds the parsed OAuth2 error
 * body (`{ error: 'invalid_grant', ... }`). The `token_refresh_error` event
 * on `oauthService.events` wraps that same raw `HttpErrorResponse` as
 * `event.reason` (`OAuthErrorEvent.params` is always `null` here — the
 * library never populates it for this event), so both call sites end up
 * passing us the same `HttpErrorResponse` shape, not an `OAuthErrorEvent`
 * with a populated `params`.
 *
 * "invalid_grant" covers every variant of an unusable refresh token we've
 * seen from Keycloak (expired, revoked, deleted session, …) — e.g.
 * "Token is not active" or "Invalid refresh token".
 */
export function isInvalidGrantError(error: unknown): boolean {
  const httpError = error as { error?: OAuth2ErrorBody } | undefined;
  if (httpError?.error?.error === 'invalid_grant') {
    return true;
  }

  // Defensive fallback in case a caller ever hands us an actual
  // OAuthErrorEvent with `params` populated instead.
  const oauthError = error as OAuthErrorEvent | undefined;
  const params = oauthError?.params as OAuth2ErrorBody | undefined;
  return params?.error === 'invalid_grant';
}

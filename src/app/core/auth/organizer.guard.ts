import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { injectIsOrganizer } from './organizer-role';

/**
 * Route guard restricting a route to organizers, redirecting non-organizers
 * to `/talks`. Only a UI-level gate — the backend independently enforces the
 * organizer role on every organizer-only endpoint.
 */
export const organizerGuard: CanActivateFn = () => {
  const isOrganizer = injectIsOrganizer();

  if (isOrganizer()) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('/talks');
};

import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder for the first route requiring an authenticated session.
 * Demonstrates wiring `authGuard` in `app.routes.ts` — replace with a real
 * feature once one exists.
 */
@Component({
  selector: 'app-account-placeholder',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="oc-eyebrow mb-2">#ACCOUNT</p>
    <p>Dieser Bereich ist nur für angemeldete Nutzer sichtbar.</p>
  `,
})
export class AccountPlaceholderComponent {}

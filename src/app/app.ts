import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { injectIsOrganizer } from './core/auth/organizer-role';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly appName = signal('Community Day Slot Manager');

  protected readonly isOrganizer = injectIsOrganizer();
  protected readonly talksLink = computed(() => (this.isOrganizer() ? '/talks' : '/talks/mine'));

  // OAuthService is only provided in the browser (see keycloak.provider.ts);
  // `optional: true` keeps this component working during SSR, where the
  // service isn't bound and auth-dependent UI simply stays hidden.
  private readonly oauthService = inject(OAuthService, { optional: true });
  // angular-oauth2-oidc reports login/logout/token-refresh via an RxJS event
  // stream rather than a signal, so bridge it to stay reactive.
  private readonly oauthEvent = this.oauthService
    ? toSignal(this.oauthService.events, { initialValue: null })
    : null;

  protected readonly authenticated = computed(() => {
    this.oauthEvent?.();
    return this.oauthService?.hasValidAccessToken() ?? false;
  });
  protected readonly username = computed(() => {
    this.oauthEvent?.();
    if (!this.authenticated()) {
      return undefined;
    }
    return this.oauthService?.getIdentityClaims()?.['preferred_username'] as string | undefined;
  });

  protected login(): void {
    this.oauthService?.initLoginFlow();
  }

  protected logout(): void {
    this.oauthService?.logOut();
  }
}

import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    // Requires an authenticated OIDC session; angular-oauth2-oidc is
    // browser-only, so this route must be rendered client-side rather than
    // prerendered/SSR'd.
    path: 'account',
    renderMode: RenderMode.Client,
  },
  {
    // These routes load live data from the backend API via rxResource and
    // (for /new) require an authenticated OIDC session — angular-oauth2-oidc
    // is browser-only, so none of these can be prerendered/SSR'd without
    // hanging the build.
    path: 'community-days',
    renderMode: RenderMode.Client,
  },
  {
    path: 'community-days/new',
    renderMode: RenderMode.Client,
  },
  {
    // Talks routes load live data via rxResource and require an
    // authenticated OIDC session — same reasoning as the routes above.
    path: 'talks/new',
    renderMode: RenderMode.Client,
  },
  {
    path: 'talks/:talkId/edit',
    renderMode: RenderMode.Client,
  },
  {
    path: 'talks',
    renderMode: RenderMode.Client,
  },
  {
    // The AppShell tab routes require an authenticated OIDC session —
    // angular-oauth2-oidc is browser-only, so these render client-side.
    path: 'submit',
    renderMode: RenderMode.Client,
  },
  {
    path: 'board',
    renderMode: RenderMode.Client,
  },
  {
    path: 'program',
    renderMode: RenderMode.Client,
  },
  {
    path: 'my-day',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];

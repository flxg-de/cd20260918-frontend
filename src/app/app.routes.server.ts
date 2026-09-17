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
    path: 'community-days/:communityDayId',
    renderMode: RenderMode.Client,
  },
  {
    // These routes load live data from the backend API via rxResource and
    // require an authenticated OIDC session — angular-oauth2-oidc is
    // browser-only, so none of these can be prerendered/SSR'd.
    path: 'slots',
    renderMode: RenderMode.Client,
  },
  {
    path: 'slots/new',
    renderMode: RenderMode.Client,
  },
  {
    path: 'slots/:slotId/edit',
    renderMode: RenderMode.Client,
  },
  {
    // Talks routes load live data via rxResource and require an
    // authenticated OIDC session — same reasoning as the slots routes above.
    path: 'talks/mine',
    renderMode: RenderMode.Client,
  },
  {
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
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];

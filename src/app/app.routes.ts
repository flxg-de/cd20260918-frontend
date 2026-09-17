import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { organizerGuard } from './core/auth/organizer.guard';
import { AccountPlaceholderComponent } from './account/account-placeholder.component';
import { AppShellComponent } from './shared/app-shell/app-shell.component';
import { CommunityDayListComponent } from './community-days/community-day-list/community-day-list.component';
import { CommunityDayCreateComponent } from './community-days/community-day-create/community-day-create.component';
import { TalkCreateComponent } from './talks/talk-create/talk-create.component';
import { TalkEditComponent } from './talks/talk-edit/talk-edit.component';
import { TalkListComponent } from './talks/talk-list/talk-list.component';
import { BoardComponent } from './board/board.component';
import { ProgramComponent } from './program/program.component';
import { MyDayComponent } from './my-day/my-day.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  {
    // Registers the static landing page's path explicitly so the SSR route
    // discovery used for prerendering can find it — the App shell itself
    // renders the marketing content outside <router-outlet>.
    path: '',
    pathMatch: 'full',
    children: [],
  },
  {
    path: 'account',
    component: AccountPlaceholderComponent,
    canActivate: [authGuard],
  },
  {
    path: 'community-days',
    component: CommunityDayListComponent,
  },
  {
    // Organizer-only route; the guard only requires a valid session — the
    // create button/form itself is gated on the organizer role, and the
    // backend independently enforces that role on the create endpoint.
    path: 'community-days/new',
    component: CommunityDayCreateComponent,
    canActivate: [authGuard],
  },
  {
    // Only usable while the current community day is in SUBMISSION phase;
    // the component itself hides the form and shows an explanatory note
    // otherwise, and the backend independently rejects with 409. Kept
    // alongside `/submit` (same component) until stage 3 reworks the
    // reachable form and this legacy path is retired.
    path: 'talks/new',
    component: TalkCreateComponent,
    canActivate: [authGuard],
  },
  {
    // Owner-only in practice (backend enforces); the guard only requires a
    // valid session. A focused edit task, not a tab — stays outside the
    // AppShell wrapper.
    path: 'talks/:talkId/edit',
    component: TalkEditComponent,
    canActivate: [authGuard],
  },
  {
    // The six main tabs from the redesign nav, rendered into AppShell's
    // `<router-outlet>`. Placeholder components stand in for views not yet
    // built (stages 3-5 replace them one by one).
    path: '',
    component: AppShellComponent,
    canActivate: [authGuard],
    children: [
      {
        // Will become the reworked talk-create in stage 3; for now reuses
        // the existing component unchanged (also reachable at `/talks/new`).
        path: 'submit',
        component: TalkCreateComponent,
      },
      {
        // Merged talk list — stat tiles, filters, sort, and per-row
        // vote/plan/reject/edit/withdraw actions gated by
        // injectIsOrganizer() and the active "Meine" filter inside the
        // component/template; the backend independently enforces every
        // organizer-only and ownership-only endpoint.
        path: 'talks',
        component: TalkListComponent,
      },
      {
        path: 'board',
        component: BoardComponent,
      },
      {
        path: 'program',
        component: ProgramComponent,
      },
      {
        path: 'my-day',
        component: MyDayComponent,
      },
      {
        // Organizer-only tab; `organizerGuard` redirects non-organizers to
        // `/talks`, and the backend independently enforces the role on
        // every admin endpoint.
        path: 'admin',
        component: AdminComponent,
        canActivate: [organizerGuard],
      },
    ],
  },
];

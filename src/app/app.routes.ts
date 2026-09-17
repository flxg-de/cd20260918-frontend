import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { AccountPlaceholderComponent } from './account/account-placeholder.component';
import { CommunityDayListComponent } from './community-days/community-day-list/community-day-list.component';
import { CommunityDayDetailComponent } from './community-days/community-day-detail/community-day-detail.component';
import { CommunityDayCreateComponent } from './community-days/community-day-create/community-day-create.component';
import { SlotListComponent } from './slots/slot-list/slot-list.component';
import { SlotCreateComponent } from './slots/slot-create/slot-create.component';
import { SlotEditComponent } from './slots/slot-edit/slot-edit.component';
import { TalkMineComponent } from './talks/talk-mine/talk-mine.component';
import { TalkCreateComponent } from './talks/talk-create/talk-create.component';
import { TalkEditComponent } from './talks/talk-edit/talk-edit.component';
import { TalkOverviewComponent } from './talks/talk-overview/talk-overview.component';

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
    path: 'community-days/:communityDayId',
    component: CommunityDayDetailComponent,
  },
  {
    // Schedule view — read-only for referents, management actions gated by
    // injectIsOrganizer() inside the component/template.
    path: 'slots',
    component: SlotListComponent,
    canActivate: [authGuard],
  },
  {
    // Organizer-only route; the guard only requires a valid session — the
    // form itself is gated on the organizer role, and the backend
    // independently enforces that role on the create endpoint.
    path: 'slots/new',
    component: SlotCreateComponent,
    canActivate: [authGuard],
  },
  {
    path: 'slots/:slotId/edit',
    component: SlotEditComponent,
    canActivate: [authGuard],
  },
  {
    // Referent's own submissions — visibility/actions are further gated by
    // status and ownership inside the component/template; the backend
    // independently enforces both.
    path: 'talks/mine',
    component: TalkMineComponent,
    canActivate: [authGuard],
  },
  {
    // Only usable while the current community day is in SUBMISSION phase;
    // the component itself hides the form and shows an explanatory note
    // otherwise, and the backend independently rejects with 409.
    path: 'talks/new',
    component: TalkCreateComponent,
    canActivate: [authGuard],
  },
  {
    // Owner-only in practice (backend enforces); the guard only requires a
    // valid session.
    path: 'talks/:talkId/edit',
    component: TalkEditComponent,
    canActivate: [authGuard],
  },
  {
    // Organizer submissions overview — assignment/rejection controls are
    // gated by injectIsOrganizer() inside the component/template, and the
    // backend independently enforces the organizer role on those endpoints.
    path: 'talks',
    component: TalkOverviewComponent,
    canActivate: [authGuard],
  },
];

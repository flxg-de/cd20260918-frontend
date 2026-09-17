import { TestBed } from '@angular/core/testing';
import { Observable, of, Subject } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { TalksService } from '../../../api/api/talks.service';
import { SlotsService } from '../../../api/api/slots.service';
import { Talk } from '../../../api/model/talk';
import { Slot } from '../../../api/model/slot';
import { TalkOverviewComponent } from './talk-overview.component';

const talk = (overrides: Partial<Talk> = {}): Talk => ({
  id: '1',
  communityDayId: 'cd-1',
  title: 'Ein Talk',
  speakers: ['Alice'],
  durationMinutes: 30,
  status: 'SUBMITTED',
  ...overrides,
});

function stubTalksService(listTalks: () => Observable<Talk[]>): TalksService {
  return {
    listTalks,
    assignTalkToSlot: () => of({}),
    rejectTalk: () => of({}),
  } as unknown as TalksService;
}

function stubSlotsService(listSlots: () => Observable<Slot[]>): SlotsService {
  return { listSlots } as unknown as SlotsService;
}

function stubOAuthService(roles: string[]): OAuthService {
  return {
    events: new Subject(),
    getIdentityClaims: () => ({ realm_access: { roles } }),
  } as unknown as OAuthService;
}

describe('TalkOverviewComponent', () => {
  function configureTestBed(api: TalksService, slotsApi: SlotsService, oauth: OAuthService): void {
    TestBed.configureTestingModule({
      imports: [TalkOverviewComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: TalksService, useValue: api },
        { provide: SlotsService, useValue: slotsApi },
        { provide: OAuthService, useValue: oauth },
      ],
    });
  }

  it('shows a loading indicator while talks are being fetched', () => {
    const pending = new Subject<Talk[]>();
    configureTestBed(
      stubTalksService(() => pending.asObservable()),
      stubSlotsService(() => of([])),
      stubOAuthService([]),
    );

    const fixture = TestBed.createComponent(TalkOverviewComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Lade Talks');
  });

  it('renders review-dashboard counts and all submitted talks once loaded', async () => {
    const talks = [
      talk({ id: '1', title: 'Talk A', status: 'SUBMITTED' }),
      talk({ id: '2', title: 'Talk B', status: 'ASSIGNED' }),
      talk({ id: '3', title: 'Talk C', status: 'REJECTED' }),
    ];
    configureTestBed(stubTalksService(() => of(talks)), stubSlotsService(() => of([])), stubOAuthService(['ORGANISATOR']));

    const fixture = TestBed.createComponent(TalkOverviewComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('3 eingereicht insgesamt');
    expect(compiled.textContent).toContain('Talk A');
    expect(compiled.textContent).toContain('Talk B');
    expect(compiled.textContent).toContain('Talk C');
  });

  it('shows assignment/rejection controls for an organizer but not for a referent', async () => {
    const talks = [talk({ id: '1', title: 'Talk A', status: 'SUBMITTED' })];

    configureTestBed(stubTalksService(() => of(talks)), stubSlotsService(() => of([])), stubOAuthService(['ORGANISATOR']));
    const organizerFixture = TestBed.createComponent(TalkOverviewComponent);
    organizerFixture.detectChanges();
    await organizerFixture.whenStable();
    organizerFixture.detectChanges();
    const organizerCompiled = organizerFixture.nativeElement as HTMLElement;
    expect(organizerCompiled.textContent).toContain('Ablehnen');
    expect(organizerCompiled.querySelector('select')).toBeTruthy();

    TestBed.resetTestingModule();
    configureTestBed(stubTalksService(() => of(talks)), stubSlotsService(() => of([])), stubOAuthService([]));
    const referentFixture = TestBed.createComponent(TalkOverviewComponent);
    referentFixture.detectChanges();
    await referentFixture.whenStable();
    referentFixture.detectChanges();
    const referentCompiled = referentFixture.nativeElement as HTMLElement;
    expect(referentCompiled.textContent).not.toContain('Ablehnen');
    expect(referentCompiled.querySelector('select')).toBeFalsy();
  });
});

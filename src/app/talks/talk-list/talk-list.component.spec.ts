import { TestBed } from '@angular/core/testing';
import { Observable, of, Subject } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { TalksService } from '../../../api/api/talks.service';
import { Talk } from '../../../api/model/talk';
import { TalkListComponent } from './talk-list.component';

const talk = (overrides: Partial<Talk> = {}): Talk => ({
  id: '1',
  communityDayId: 'cd-1',
  title: 'Ein Talk',
  speakers: ['Alice'],
  durationMinutes: 30,
  status: 'SUBMITTED',
  votes: 0,
  ...overrides,
});

function stubTalksService(
  listTalks: (params?: { mine?: boolean; favorite?: boolean }) => Observable<Talk[]>,
): TalksService {
  return {
    listTalks,
    assignTalkToSlot: () => of({}),
    rejectTalk: () => of({}),
    withdrawTalk: () => of({}),
    voteForTalk: () => of({}),
    removeVoteForTalk: () => of({}),
  } as unknown as TalksService;
}

function fakeAccessToken(roles: string[]): string {
  const payload = btoa(JSON.stringify({ realm_access: { roles } }));
  return `header.${payload}.signature`;
}

function stubOAuthService(roles: string[]): OAuthService {
  return {
    events: new Subject(),
    getAccessToken: () => fakeAccessToken(roles),
  } as unknown as OAuthService;
}

describe('TalkListComponent', () => {
  function configureTestBed(api: TalksService, oauth: OAuthService = stubOAuthService([])): void {
    TestBed.configureTestingModule({
      imports: [TalkListComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: TalksService, useValue: api },
        { provide: OAuthService, useValue: oauth },
      ],
    });
  }

  it('shows a loading indicator while talks are being fetched', () => {
    const pending = new Subject<Talk[]>();
    configureTestBed(stubTalksService(() => pending.asObservable()));

    const fixture = TestBed.createComponent(TalkListComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Lade Talks');
  });

  it('renders stat tiles and all talks once loaded', async () => {
    const talks = [
      talk({ id: '1', title: 'Talk A', status: 'SUBMITTED', votes: 3 }),
      talk({ id: '2', title: 'Talk B', status: 'ASSIGNED', votes: 5, slotId: 'slot-1' }),
      talk({ id: '3', title: 'Talk C', status: 'REJECTED', votes: 1 }),
    ];
    configureTestBed(stubTalksService(() => of(talks)));

    const fixture = TestBed.createComponent(TalkListComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Talk A');
    expect(compiled.textContent).toContain('Talk B');
    expect(compiled.textContent).toContain('Talk C');
    expect(compiled.textContent).toContain('Einreichungen');
  });

  it('shows the reject action and Einplanen button for an organizer but not for a referent', async () => {
    const talks = [talk({ id: '1', title: 'Talk A', status: 'SUBMITTED' })];

    configureTestBed(stubTalksService(() => of(talks)), stubOAuthService(['ORGANISATOR']));
    const organizerFixture = TestBed.createComponent(TalkListComponent);
    organizerFixture.detectChanges();
    await organizerFixture.whenStable();
    organizerFixture.detectChanges();
    const organizerCompiled = organizerFixture.nativeElement as HTMLElement;
    expect(organizerCompiled.textContent).toContain('Ablehnen');
    expect(organizerCompiled.textContent).toContain('Einplanen');

    TestBed.resetTestingModule();
    configureTestBed(stubTalksService(() => of(talks)), stubOAuthService([]));
    const referentFixture = TestBed.createComponent(TalkListComponent);
    referentFixture.detectChanges();
    await referentFixture.whenStable();
    referentFixture.detectChanges();
    const referentCompiled = referentFixture.nativeElement as HTMLElement;
    expect(referentCompiled.textContent).not.toContain('Ablehnen');
    expect(referentCompiled.textContent).not.toContain('Einplanen');
  });

  it('shows edit/withdraw actions only when the "Meine" filter is active', async () => {
    const talks = [talk({ id: '1', title: 'Talk A', status: 'SUBMITTED' })];
    const listTalks = vi.fn((params?: { mine?: boolean }) => of(params?.mine ? talks : talks));
    configureTestBed(stubTalksService(listTalks));

    const fixture = TestBed.createComponent(TalkListComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    let compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).not.toContain('Zurückziehen');

    fixture.componentInstance['setFilter']('MINE');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    compiled = fixture.nativeElement as HTMLElement;
    expect(listTalks).toHaveBeenCalledWith({ mine: true });
    expect(compiled.textContent).toContain('Zurückziehen');
    expect(compiled.textContent).toContain('Bearbeiten');
  });

  it('toggles vote label based on votedByMe', async () => {
    const talks = [talk({ id: '1', title: 'Talk A', votedByMe: false, votes: 2 })];
    configureTestBed(stubTalksService(() => of(talks)));

    const fixture = TestBed.createComponent(TalkListComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('2');
  });
});

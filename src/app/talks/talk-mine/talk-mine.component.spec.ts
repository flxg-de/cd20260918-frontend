import { TestBed } from '@angular/core/testing';
import { Observable, of, Subject } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TalksService } from '../../../api/api/talks.service';
import { CommunityDaysService } from '../../../api/api/community-days.service';
import { Talk } from '../../../api/model/talk';
import { CommunityDay } from '../../../api/model/community-day';
import { TalkMineComponent } from './talk-mine.component';

const talk = (overrides: Partial<Talk> = {}): Talk => ({
  id: '1',
  communityDayId: 'cd-1',
  title: 'Mein Talk',
  speakers: ['Alice'],
  durationMinutes: 30,
  status: 'SUBMITTED',
  ...overrides,
});

const communityDay = (overrides: Partial<CommunityDay> = {}): CommunityDay => ({
  id: 'cd-1',
  name: 'CD 2026',
  description: '',
  date: '2026-09-18',
  phase: 'SUBMISSION',
  ...overrides,
});

function stubTalksService(listTalks: () => Observable<Talk[]>): TalksService {
  return { listTalks, withdrawTalk: () => of({}) } as unknown as TalksService;
}

function stubCommunityDaysService(phase: CommunityDay['phase']): CommunityDaysService {
  return {
    getCurrentCommunityDay: () => of(communityDay({ phase })),
  } as unknown as CommunityDaysService;
}

describe('TalkMineComponent', () => {
  function configureTestBed(api: TalksService, communityDaysApi: CommunityDaysService): void {
    TestBed.configureTestingModule({
      imports: [TalkMineComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: TalksService, useValue: api },
        { provide: CommunityDaysService, useValue: communityDaysApi },
      ],
    });
  }

  it('shows a loading indicator while talks are being fetched', () => {
    const pending = new Subject<Talk[]>();
    configureTestBed(stubTalksService(() => pending.asObservable()), stubCommunityDaysService('SUBMISSION'));

    const fixture = TestBed.createComponent(TalkMineComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Lade Talks');
  });

  it('renders the referent\'s own talks with a status badge once loaded', async () => {
    const talks = [talk({ id: '1', title: 'Talk A', status: 'SUBMITTED' }), talk({ id: '2', title: 'Talk B', status: 'ASSIGNED' })];
    configureTestBed(stubTalksService(() => of(talks)), stubCommunityDaysService('SUBMISSION'));

    const fixture = TestBed.createComponent(TalkMineComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Talk A');
    expect(compiled.textContent).toContain('Talk B');
    expect(compiled.textContent).toContain('Eingereicht');
    expect(compiled.textContent).toContain('Zugeordnet');
  });

  it('shows edit/withdraw actions only for talks still in SUBMITTED status', async () => {
    const talks = [talk({ id: '1', title: 'Talk A', status: 'SUBMITTED' }), talk({ id: '2', title: 'Talk B', status: 'ASSIGNED' })];
    configureTestBed(stubTalksService(() => of(talks)), stubCommunityDaysService('SUBMISSION'));

    const fixture = TestBed.createComponent(TalkMineComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('li');
    expect(items[0].textContent).toContain('Zurückziehen');
    expect(items[1].textContent).not.toContain('Zurückziehen');
  });

  it('hides the "Neuen Talk einreichen" CTA outside the submission phase', async () => {
    configureTestBed(stubTalksService(() => of([])), stubCommunityDaysService('PLANNING'));

    const fixture = TestBed.createComponent(TalkMineComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).not.toContain('Neuen Talk einreichen');
    expect(compiled.textContent).toContain('nicht möglich');
  });
});

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { CommunityDaysService } from '../../api/api/community-days.service';
import { ScheduleService } from '../../api/api/schedule.service';
import { TalksService } from '../../api/api/talks.service';
import { CommunityDay } from '../../api/model/community-day';
import { Schedule } from '../../api/model/schedule';
import { Talk } from '../../api/model/talk';
import { ProgramComponent } from './program.component';

const TALK_A: Talk = {
  id: 'talk-1',
  title: 'Session A',
  speakers: ['Alice'],
  durationMinutes: 25,
  communityDayId: 'cd-1',
  status: 'ASSIGNED',
  slotId: 'slot-1',
  timeBlockId: 'tb-1',
  favoritedByMe: false,
};

const SCHEDULE: Schedule = {
  communityDayId: 'cd-1',
  slots: [{ id: 'slot-1', communityDayId: 'cd-1', name: 'Track A', format: 'ON_SITE', location: 'ESSEN' }],
  timeBlocks: [
    {
      id: 'tb-1',
      communityDayId: 'cd-1',
      startTime: '09:00',
      endTime: '09:30',
      locked: false,
      cells: [{ slotId: 'slot-1', talk: TALK_A }],
    },
  ],
};

function configure(options: {
  phase?: string;
  talksApi?: Record<string, unknown>;
} = {}): void {
  const day = { id: 'cd-1', phase: options.phase ?? 'PUBLISHED' } as unknown as CommunityDay;
  const communityDaysApi = { getCurrentCommunityDay: () => of(day) } as unknown as CommunityDaysService;
  const scheduleApi = { getSchedule: () => of(SCHEDULE) } as unknown as ScheduleService;
  const talksApi = {
    favoriteTalk: () => of(TALK_A),
    unfavoriteTalk: () => of(TALK_A),
    ...options.talksApi,
  } as unknown as TalksService;

  TestBed.configureTestingModule({
    imports: [ProgramComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: CommunityDaysService, useValue: communityDaysApi },
      { provide: ScheduleService, useValue: scheduleApi },
      { provide: TalksService, useValue: talksApi },
    ],
  });
}

describe('ProgramComponent', () => {
  it('shows an explanatory empty state when the phase is not PLANNING/PUBLISHED', async () => {
    configure({ phase: 'SUBMISSION' });

    const fixture = TestBed.createComponent(ProgramComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Das Programm ist noch nicht verfügbar.');
  });

  it('renders sessions grouped by time block', async () => {
    configure();

    const fixture = TestBed.createComponent(ProgramComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Session A');
    expect(text).toContain('09:00–09:30');
  });

  it('calls favoriteTalk when clicking Merken on a non-favorited session', async () => {
    const favoriteTalk = vi.fn(() => of({ ...TALK_A, favoritedByMe: true }));
    configure({ talksApi: { favoriteTalk } });

    const fixture = TestBed.createComponent(ProgramComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const buttons = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('button'));
    const favButton = buttons.find((button) => button.textContent?.trim() === 'Merken');
    favButton?.dispatchEvent(new Event('click', { bubbles: true }));

    expect(favoriteTalk).toHaveBeenCalledWith({ talkId: TALK_A.id });
  });
});

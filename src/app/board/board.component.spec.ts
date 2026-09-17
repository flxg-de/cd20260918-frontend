import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { CommunityDaysService } from '../../api/api/community-days.service';
import { ScheduleService } from '../../api/api/schedule.service';
import { TalksService } from '../../api/api/talks.service';
import { CommunityDay } from '../../api/model/community-day';
import { Schedule } from '../../api/model/schedule';
import { Talk } from '../../api/model/talk';
import { SlotFormat } from '../../api/model/slot-format';
import { BoardComponent } from './board.component';

const COMMUNITY_DAY = { id: 'cd-1', phase: 'SCHEDULING' } as unknown as CommunityDay;

const PLACED_TALK: Talk = {
  id: 'talk-1',
  title: 'Placed Talk',
  speakers: ['A'],
  durationMinutes: 25,
  communityDayId: 'cd-1',
  status: 'ASSIGNED',
  slotId: 'slot-1',
  timeBlockId: 'tb-1',
};

const UNPLACED_TALK: Talk = {
  id: 'talk-2',
  title: 'Unplaced Talk',
  speakers: ['B'],
  durationMinutes: 45,
  communityDayId: 'cd-1',
  status: 'SUBMITTED',
  slotId: null,
  timeBlockId: null,
};

const SCHEDULE: Schedule = {
  communityDayId: 'cd-1',
  slots: [{ id: 'slot-1', communityDayId: 'cd-1', name: 'Track A', format: SlotFormat.ON_SITE }],
  timeBlocks: [
    {
      id: 'tb-1',
      communityDayId: 'cd-1',
      startTime: '09:00',
      endTime: '09:30',
      locked: false,
      cells: [{ slotId: 'slot-1', talk: PLACED_TALK }],
    },
  ],
};

function stubTalksService(assignTalkToSlot = vi.fn(() => of(PLACED_TALK))): TalksService {
  return {
    listTalks: () => of([PLACED_TALK, UNPLACED_TALK]),
    assignTalkToSlot,
  } as unknown as TalksService;
}

function configure(options: {
  talksApi?: TalksService;
  queryParamTalkId?: string;
} = {}): void {
  const communityDaysApi = { getCurrentCommunityDay: () => of(COMMUNITY_DAY) } as unknown as CommunityDaysService;
  const scheduleApi = { getSchedule: () => of(SCHEDULE) } as unknown as ScheduleService;

  TestBed.configureTestingModule({
    imports: [BoardComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: TalksService, useValue: options.talksApi ?? stubTalksService() },
      { provide: CommunityDaysService, useValue: communityDaysApi },
      { provide: ScheduleService, useValue: scheduleApi },
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            queryParamMap: convertToParamMap(
              options.queryParamTalkId ? { talkId: options.queryParamTalkId } : {},
            ),
          },
        },
      },
    ],
  });
}

describe('BoardComponent', () => {
  it('renders the schedule grid with the placed talk and the pool of unplaced talks', async () => {
    configure();

    const fixture = TestBed.createComponent(BoardComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Placed Talk');
    expect(text).toContain('Unplaced Talk');
  });

  it('assigns the selected talk when clicking an empty cell', async () => {
    const assignTalkToSlot = vi.fn(() =>
      of({ ...UNPLACED_TALK, slotId: 'slot-1', timeBlockId: 'tb-1' }),
    );
    configure({ talksApi: stubTalksService(assignTalkToSlot) });

    const fixture = TestBed.createComponent(BoardComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance;
    component['selected'].set(UNPLACED_TALK.id);
    component['clickCell']('slot-1', 'tb-1', null);

    expect(assignTalkToSlot).toHaveBeenCalledWith({
      talkId: UNPLACED_TALK.id,
      assignmentRequest: { slotId: 'slot-1', timeBlockId: 'tb-1' },
    });
  });

  it('shows a conflict message when assignment fails with 409', async () => {
    const assignTalkToSlot = vi.fn(() => throwError(() => ({ status: 409 })));
    configure({ talksApi: stubTalksService(assignTalkToSlot) });

    const fixture = TestBed.createComponent(BoardComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance;
    component['selected'].set(UNPLACED_TALK.id);
    component['clickCell']('slot-1', 'tb-1', null);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component['actionError']()).toContain('Zuordnung nicht möglich');
  });

  it('pre-selects the talk from the talkId query param', async () => {
    configure({ queryParamTalkId: UNPLACED_TALK.id });

    const fixture = TestBed.createComponent(BoardComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance['selected']()).toBe(UNPLACED_TALK.id);
  });
});

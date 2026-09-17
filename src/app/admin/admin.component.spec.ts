import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { CommunityDaysService } from '../../api/api/community-days.service';
import { SlotsService } from '../../api/api/slots.service';
import { TimeBlocksService } from '../../api/api/time-blocks.service';
import { CommunityDay } from '../../api/model/community-day';
import { Slot } from '../../api/model/slot';
import { SlotFormat } from '../../api/model/slot-format';
import { TimeBlock } from '../../api/model/time-block';
import { AdminComponent } from './admin.component';

const CURRENT_DAY: CommunityDay = {
  id: 'cd-1',
  name: 'Community Day 2026',
  description: 'desc',
  date: '2026-09-18',
  submissionDeadline: null,
  lateSubmissionDeadline: null,
  phase: 'SUBMISSION',
};

const SLOT: Slot = {
  id: 'slot-1',
  communityDayId: 'cd-1',
  name: 'Track A',
  format: SlotFormat.ON_SITE,
};

const TIME_BLOCK: TimeBlock = {
  id: 'tb-1',
  communityDayId: 'cd-1',
  startTime: '09:00',
  endTime: '09:30',
  label: 'Frühstück',
  locked: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiStub = Record<string, (...args: any[]) => unknown>;

function configure(options: {
  communityDaysApi?: ApiStub;
  slotsApi?: ApiStub;
  timeBlocksApi?: ApiStub;
} = {}): void {
  const communityDaysApi = {
    getCurrentCommunityDay: () => of(CURRENT_DAY),
    updateCommunityDay: () => of(CURRENT_DAY),
    transitionToPlanning: () => of({ ...CURRENT_DAY, phase: 'PLANNING' }),
    transitionToPublished: () => of({ ...CURRENT_DAY, phase: 'PUBLISHED' }),
    ...options.communityDaysApi,
  } as unknown as CommunityDaysService;

  const slotsApi = {
    listSlots: () => of([SLOT]),
    deleteSlot: () => of({}),
    createSlot: () => of(SLOT),
    ...options.slotsApi,
  } as unknown as SlotsService;

  const timeBlocksApi = {
    listTimeBlocks: () => of([TIME_BLOCK]),
    deleteTimeBlock: () => of({}),
    createTimeBlock: () => of(TIME_BLOCK),
    updateTimeBlock: () => of(TIME_BLOCK),
    ...options.timeBlocksApi,
  } as unknown as TimeBlocksService;

  TestBed.configureTestingModule({
    imports: [AdminComponent],
    providers: [
      provideZonelessChangeDetection(),
      { provide: CommunityDaysService, useValue: communityDaysApi },
      { provide: SlotsService, useValue: slotsApi },
      { provide: TimeBlocksService, useValue: timeBlocksApi },
    ],
  });
}

describe('AdminComponent', () => {
  it('renders the event fields, swimlanes, and time blocks of the current community day', async () => {
    configure();

    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Track A');
    expect(text).toContain('09:00');
    expect((fixture.componentInstance['eventModel']().name)).toBe('Community Day 2026');
  });

  it('saves the event fields via updateCommunityDay', async () => {
    const updateCommunityDay = vi.fn(() => of(CURRENT_DAY));
    configure({ communityDaysApi: { updateCommunityDay } });

    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance;
    component['eventModel'].update((model) => ({ ...model, name: 'Neuer Name' }));
    component['saveEvent'](new Event('submit'));

    expect(updateCommunityDay).toHaveBeenCalledWith(
      expect.objectContaining({
        communityDayId: 'cd-1',
        communityDayUpdateRequest: expect.objectContaining({ name: 'Neuer Name' }),
      }),
    );
  });

  it('shows a conflict message when a phase transition fails with 409', async () => {
    const transitionToPlanning = vi.fn(() => throwError(() => ({ status: 409 })));
    configure({ communityDaysApi: { transitionToPlanning } });

    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance;
    component['transitionToPhase']('PLANNING', CURRENT_DAY);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component['transitionError']()).toContain('nicht möglich');
  });

  it('does not call a transition for the current or a past phase', async () => {
    const transitionToPublished = vi.fn(() => of(CURRENT_DAY));
    configure({ communityDaysApi: { transitionToPublished } });

    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.componentInstance['transitionToPhase']('PUBLISHED', CURRENT_DAY);

    expect(transitionToPublished).not.toHaveBeenCalled();
  });

  it('shows a conflict message when deleting a slot that still has talks fails with 409', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const deleteSlot = vi.fn(() => throwError(() => ({ status: 409 })));
    configure({ slotsApi: { deleteSlot } });

    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.componentInstance['deleteSlot'](SLOT);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance['slotError']()).toContain('nicht entfernt werden');
  });

  it('toggles a time block lock state via updateTimeBlock', async () => {
    const updateTimeBlock = vi.fn(() => of({ ...TIME_BLOCK, locked: true }));
    configure({ timeBlocksApi: { updateTimeBlock } });

    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.componentInstance['toggleTimeBlockLocked'](TIME_BLOCK);

    expect(updateTimeBlock).toHaveBeenCalledWith(
      expect.objectContaining({ timeBlockId: 'tb-1', timeBlockCreateRequest: expect.objectContaining({ locked: true }) }),
    );
  });
});

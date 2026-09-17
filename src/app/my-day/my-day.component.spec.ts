import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TalksService } from '../../api/api/talks.service';
import { TimeBlocksService } from '../../api/api/time-blocks.service';
import { SlotsService } from '../../api/api/slots.service';
import { Talk } from '../../api/model/talk';
import { TimeBlock } from '../../api/model/time-block';
import { Slot } from '../../api/model/slot';
import { MyDayComponent } from './my-day.component';

const ASSIGNED_TALK: Talk = {
  id: 'talk-1',
  title: 'Assigned Favorite',
  speakers: ['Alice'],
  durationMinutes: 25,
  communityDayId: 'cd-1',
  status: 'ASSIGNED',
  slotId: 'slot-1',
  timeBlockId: 'tb-2',
  favoritedByMe: true,
};

const UNASSIGNED_TALK: Talk = {
  id: 'talk-2',
  title: 'Unassigned Favorite',
  speakers: ['Bob'],
  durationMinutes: 45,
  communityDayId: 'cd-1',
  status: 'SUBMITTED',
  slotId: null,
  timeBlockId: null,
  favoritedByMe: true,
};

const LOCKED_BLOCK: TimeBlock = {
  id: 'tb-1',
  communityDayId: 'cd-1',
  startTime: '08:00',
  endTime: '08:30',
  locked: true,
  label: 'Frühstück',
};

const OPEN_BLOCK: TimeBlock = {
  id: 'tb-2',
  communityDayId: 'cd-1',
  startTime: '09:00',
  endTime: '09:30',
  locked: false,
};

const SLOT: Slot = { id: 'slot-1', communityDayId: 'cd-1', name: 'Track A', format: 'ON_SITE', location: 'ESSEN' };

function configure(options: {
  favorites?: Talk[];
  talksApi?: Record<string, unknown>;
} = {}): void {
  const talksApi = {
    listTalks: () => of(options.favorites ?? [ASSIGNED_TALK, UNASSIGNED_TALK]),
    unfavoriteTalk: () => of(ASSIGNED_TALK),
    ...options.talksApi,
  } as unknown as TalksService;
  const timeBlocksApi = { listTimeBlocks: () => of([LOCKED_BLOCK, OPEN_BLOCK]) } as unknown as TimeBlocksService;
  const slotsApi = { listSlots: () => of([SLOT]) } as unknown as SlotsService;

  TestBed.configureTestingModule({
    imports: [MyDayComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      { provide: TalksService, useValue: talksApi },
      { provide: TimeBlocksService, useValue: timeBlocksApi },
      { provide: SlotsService, useValue: slotsApi },
    ],
  });
}

describe('MyDayComponent', () => {
  it('renders the merged, time-sorted list of favorited talks and locked blocks', async () => {
    configure();

    const fixture = TestBed.createComponent(MyDayComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    const breakfastIndex = text.indexOf('Frühstück');
    const assignedIndex = text.indexOf('Assigned Favorite');
    expect(breakfastIndex).toBeGreaterThan(-1);
    expect(assignedIndex).toBeGreaterThan(-1);
    expect(breakfastIndex).toBeLessThan(assignedIndex);
  });

  it('shows unassigned favorites in a separate note', async () => {
    configure();

    const fixture = TestBed.createComponent(MyDayComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Noch nicht eingeplant');
    expect(text).toContain('Unassigned Favorite');
  });

  it('calls unfavoriteTalk and refreshes when Entfernen is clicked', async () => {
    const unfavoriteTalk = vi.fn(() => of(ASSIGNED_TALK));
    configure({ talksApi: { unfavoriteTalk } });

    const fixture = TestBed.createComponent(MyDayComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const buttons = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('button'));
    const removeButton = buttons.find((button) => button.textContent?.trim() === 'Entfernen');
    removeButton?.dispatchEvent(new Event('click', { bubbles: true }));

    expect(unfavoriteTalk).toHaveBeenCalledWith({ talkId: ASSIGNED_TALK.id });
  });

  it('shows the empty state when there are no favorites', async () => {
    configure({ favorites: [] });

    const fixture = TestBed.createComponent(MyDayComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Noch keine Favoriten');
  });
});

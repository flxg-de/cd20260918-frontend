import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { TalksService } from '../../api/api/talks.service';
import { TimeBlocksService } from '../../api/api/time-blocks.service';
import { SlotsService } from '../../api/api/slots.service';
import { Talk } from '../../api/model/talk';
import { TimeBlock } from '../../api/model/time-block';
import { Slot } from '../../api/model/slot';
import { CardComponent } from '../shared/card/card.component';
import { ButtonComponent } from '../shared/button/button.component';

/** A merged, time-sorted row of "Mein Tag" — either a locked day block or a favorited talk. */
interface MyDayEntry {
  readonly id: string;
  readonly time: string;
  readonly title: string;
  readonly meta: string;
  readonly locked: boolean;
  readonly talkId?: string;
}

function slotLabel(slot: Slot | undefined): string {
  if (!slot) {
    return '';
  }
  return slot.location ? `${slot.name} · ${slot.location}` : `${slot.name} · Digital`;
}

@Component({
  selector: 'app-my-day',
  standalone: true,
  imports: [CardComponent, ButtonComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-day.component.html',
})
export class MyDayComponent {
  private readonly talksApi = inject(TalksService);
  private readonly timeBlocksApi = inject(TimeBlocksService);
  private readonly slotsApi = inject(SlotsService);

  protected readonly actionError = signal<string | null>(null);

  protected readonly favoritesResource = rxResource({
    stream: () => this.talksApi.listTalks({ favorite: true }),
  });

  protected readonly timeBlocksResource = rxResource({
    stream: () => this.timeBlocksApi.listTimeBlocks({}),
  });

  protected readonly slotsResource = rxResource({
    stream: () => this.slotsApi.listSlots({}),
  });

  protected readonly isLoading = computed(
    () =>
      this.favoritesResource.isLoading() ||
      this.timeBlocksResource.isLoading() ||
      this.slotsResource.isLoading(),
  );

  protected readonly hasError = computed(
    () => !!this.favoritesResource.error() || !!this.timeBlocksResource.error() || !!this.slotsResource.error(),
  );

  private readonly timeBlocksById = computed(() => {
    const map = new Map<string, TimeBlock>();
    for (const timeBlock of this.timeBlocksResource.value() ?? []) {
      map.set(timeBlock.id, timeBlock);
    }
    return map;
  });

  private readonly slotsById = computed(() => {
    const map = new Map<string, Slot>();
    for (const slot of this.slotsResource.value() ?? []) {
      map.set(slot.id, slot);
    }
    return map;
  });

  protected readonly favorites = computed(() => this.favoritesResource.value() ?? []);

  protected readonly unassignedFavorites = computed(() =>
    this.favorites().filter((talk) => !talk.timeBlockId || !talk.slotId),
  );

  protected readonly entries = computed<MyDayEntry[]>(() => {
    const timeBlocksById = this.timeBlocksById();
    const slotsById = this.slotsById();

    const lockedEntries: MyDayEntry[] = (this.timeBlocksResource.value() ?? [])
      .filter((timeBlock) => timeBlock.locked)
      .map((timeBlock) => ({
        id: timeBlock.id,
        time: `${timeBlock.startTime}–${timeBlock.endTime}`,
        title: timeBlock.label ?? 'Fester Programmpunkt',
        meta: '',
        locked: true,
      }));

    const talkEntries: MyDayEntry[] = this.favorites()
      .filter((talk): talk is Talk & { timeBlockId: string; slotId: string } => !!talk.timeBlockId && !!talk.slotId)
      .map((talk) => {
        const timeBlock = timeBlocksById.get(talk.timeBlockId);
        const slot = slotsById.get(talk.slotId);
        return {
          id: talk.id,
          time: timeBlock ? `${timeBlock.startTime}–${timeBlock.endTime}` : '',
          title: talk.title,
          meta: `${slotLabel(slot)} · ${talk.speakers.join(', ')}`,
          locked: false,
          talkId: talk.id,
        };
      });

    return [...lockedEntries, ...talkEntries].sort((a, b) => a.time.localeCompare(b.time));
  });

  protected removeFavorite(talkId: string): void {
    this.actionError.set(null);
    this.talksApi.unfavoriteTalk({ talkId }).subscribe({
      next: () => this.favoritesResource.reload(),
      error: (error: HttpErrorResponse) => {
        this.actionError.set(
          error.status === 409
            ? 'Favorit konnte nicht entfernt werden — bitte erneut versuchen.'
            : 'Favorit konnte nicht entfernt werden.',
        );
      },
    });
  }
}

import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { CommunityDaysService } from '../../api/api/community-days.service';
import { ScheduleService } from '../../api/api/schedule.service';
import { TalksService } from '../../api/api/talks.service';
import { CommunityDayPhase } from '../../api/model/community-day-phase';
import { Talk } from '../../api/model/talk';
import { ScheduleRow } from '../../api/model/schedule-row';
import { CardComponent } from '../shared/card/card.component';
import { ChipComponent } from '../shared/chip/chip.component';
import { ButtonComponent } from '../shared/button/button.component';
import { StatusPillComponent } from '../shared/status-pill/status-pill.component';

const DIGITAL_FILTER = 'Digital';
const ALL_FILTER = 'Alle';

/** A location-filtered session card ready for rendering. */
interface SessionCardModel {
  readonly talkId: string;
  readonly slotName: string;
  readonly title: string;
  readonly meta: string;
  readonly modeLabel: string;
  readonly favorited: boolean;
}

/** A time block row — either a locked info bar or an open row of session cards. */
interface ProgramRow {
  readonly id: string;
  readonly label: string;
  readonly locked: boolean;
  readonly blockTitle: string;
  readonly sessions: SessionCardModel[];
}

function rowLabel(row: ScheduleRow): string {
  return `${row.startTime}–${row.endTime}`;
}

function modeLabel(format: string): string {
  switch (format) {
    case 'VIRTUAL':
      return 'Digital';
    case 'HYBRID':
      return 'Hybrid';
    default:
      return 'Vor Ort';
  }
}

function talkMeta(talk: Talk): string {
  return `${talk.speakers.join(', ')} · ${talk.durationMinutes} min`;
}

@Component({
  selector: 'app-program',
  standalone: true,
  imports: [CardComponent, ChipComponent, ButtonComponent, StatusPillComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './program.component.html',
})
export class ProgramComponent {
  private readonly communityDaysApi = inject(CommunityDaysService);
  private readonly scheduleApi = inject(ScheduleService);
  private readonly talksApi = inject(TalksService);

  protected readonly favoriteError = signal<string | null>(null);
  protected readonly locationFilter = signal(ALL_FILTER);

  protected readonly currentDayResource = rxResource({
    stream: () => this.communityDaysApi.getCurrentCommunityDay(),
  });

  private readonly communityDayId = computed(() => this.currentDayResource.value()?.id);

  protected readonly programAvailable = computed(() => {
    const phase = this.currentDayResource.value()?.phase;
    return phase === CommunityDayPhase.PLANNING || phase === CommunityDayPhase.PUBLISHED;
  });

  protected readonly scheduleResource = rxResource({
    params: () => {
      const communityDayId = this.communityDayId();
      return this.programAvailable() && communityDayId ? { communityDayId } : undefined;
    },
    stream: ({ params }) => this.scheduleApi.getSchedule({ communityDayId: params.communityDayId }),
  });

  private readonly slots = computed(() => this.scheduleResource.value()?.slots ?? []);

  protected readonly locationOptions = computed<string[]>(() => {
    const locations = new Set<string>();
    let hasDigital = false;
    for (const slot of this.slots()) {
      if (slot.format === 'VIRTUAL' || !slot.location) {
        hasDigital = true;
      } else {
        locations.add(slot.location);
      }
    }
    const options = [ALL_FILTER, ...Array.from(locations).sort()];
    if (hasDigital) {
      options.push(DIGITAL_FILTER);
    }
    return options;
  });

  private slotMatchesFilter(slot: { format: string; location?: string | null }): boolean {
    const filter = this.locationFilter();
    if (filter === ALL_FILTER) {
      return true;
    }
    if (filter === DIGITAL_FILTER) {
      return slot.format === 'VIRTUAL' || !slot.location;
    }
    return slot.location === filter;
  }

  protected readonly rows = computed<ProgramRow[]>(() => {
    const slots = this.slots();
    return (this.scheduleResource.value()?.timeBlocks ?? []).map((row) => {
      const sessions: SessionCardModel[] = (row.cells ?? [])
        .filter((cell) => cell.talk)
        .map((cell) => ({ cell, slot: slots.find((s) => s.id === cell.slotId) }))
        .filter((entry): entry is { cell: NonNullable<typeof entry.cell>; slot: NonNullable<typeof entry.slot> } =>
          !!entry.slot && this.slotMatchesFilter(entry.slot),
        )
        .map(({ cell, slot }) => {
          const talk = cell.talk as Talk;
          return {
            talkId: talk.id,
            slotName: slot.location ? `${slot.name} · ${slot.location}` : slot.name,
            title: talk.title,
            meta: talkMeta(talk),
            modeLabel: modeLabel(slot.format),
            favorited: talk.favoritedByMe ?? false,
          };
        });

      return {
        id: row.id,
        label: rowLabel(row),
        locked: row.locked ?? false,
        blockTitle: row.label ?? '',
        sessions,
      };
    });
  });

  protected selectLocation(location: string): void {
    this.locationFilter.set(location);
  }

  protected toggleFavorite(talkId: string, favorited: boolean): void {
    this.favoriteError.set(null);
    const request = favorited
      ? this.talksApi.unfavoriteTalk({ talkId })
      : this.talksApi.favoriteTalk({ talkId });
    request.subscribe({
      next: () => this.scheduleResource.reload(),
      error: (error: HttpErrorResponse) => {
        this.favoriteError.set(
          error.status === 409
            ? 'Favorit konnte nicht gespeichert werden — bitte erneut versuchen.'
            : 'Favorit konnte nicht gespeichert werden.',
        );
      },
    });
  }
}

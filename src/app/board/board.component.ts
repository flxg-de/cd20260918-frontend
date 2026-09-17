import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommunityDaysService } from '../../api/api/community-days.service';
import { ScheduleService } from '../../api/api/schedule.service';
import { TalksService } from '../../api/api/talks.service';
import { Talk } from '../../api/model/talk';
import { ScheduleRow } from '../../api/model/schedule-row';
import { injectIsOrganizer } from '../core/auth/organizer-role';
import { CardComponent } from '../shared/card/card.component';

/** A row of the rendered board — either a locked, full-width block or an open row of cells. */
interface BoardRow {
  readonly id: string;
  readonly label: string;
  readonly locked: boolean;
  readonly cells: ReadonlyArray<{ slotId: string; talk: Talk | null }>;
}

function talkMeta(talk: Talk): string {
  const parts = [`${talk.durationMinutes} min`];
  if (talk.votes !== undefined) {
    parts.push(`${talk.votes} Stimmen`);
  }
  return parts.join(' · ');
}

function rowLabel(row: ScheduleRow): string {
  const time = `${row.startTime}–${row.endTime}`;
  return row.label ? `${time} · ${row.label}` : time;
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './board.component.html',
})
export class BoardComponent {
  private readonly communityDaysApi = inject(CommunityDaysService);
  private readonly scheduleApi = inject(ScheduleService);
  private readonly talksApi = inject(TalksService);
  private readonly route = inject(ActivatedRoute);

  protected readonly isOrganizer = injectIsOrganizer();

  protected readonly selected = signal<string | null>(null);
  protected readonly dragId = signal<string | null>(null);
  protected readonly actionError = signal<string | null>(null);

  protected readonly currentDayResource = rxResource({
    stream: () => this.communityDaysApi.getCurrentCommunityDay(),
  });

  private readonly communityDayId = computed(() => this.currentDayResource.value()?.id);

  protected readonly scheduleResource = rxResource({
    params: () => {
      const communityDayId = this.communityDayId();
      return communityDayId ? { communityDayId } : undefined;
    },
    stream: ({ params }) => this.scheduleApi.getSchedule({ communityDayId: params.communityDayId }),
  });

  protected readonly talksResource = rxResource({
    stream: () => this.talksApi.listTalks({}),
  });

  protected readonly slots = computed(() => this.scheduleResource.value()?.slots ?? []);

  protected readonly rows = computed<BoardRow[]>(() =>
    (this.scheduleResource.value()?.timeBlocks ?? []).map((row) => ({
      id: row.id,
      label: rowLabel(row),
      locked: row.locked ?? false,
      cells: this.slots().map((slot) => ({
        slotId: slot.id,
        talk: row.cells?.find((cell) => cell.slotId === slot.id)?.talk ?? null,
      })),
    })),
  );

  protected readonly pool = computed(() =>
    (this.talksResource.value() ?? []).filter((talk) => !talk.slotId && !talk.timeBlockId),
  );

  protected readonly selectedTalk = computed(() => {
    const id = this.selected();
    return id ? (this.talksResource.value() ?? []).find((talk) => talk.id === id) : undefined;
  });

  protected readonly boardStatus = computed(() => {
    const selectedTalk = this.selectedTalk();
    return selectedTalk ? `Ziel für "${selectedTalk.title}" wählen` : `${this.pool().length} offen`;
  });

  protected readonly talkMeta = talkMeta;

  constructor() {
    const talkId = this.route.snapshot.queryParamMap.get('talkId');
    if (talkId) {
      this.selected.set(talkId);
    }
  }

  protected selectPoolTalk(talk: Talk): void {
    this.selected.update((current) => (current === talk.id ? null : talk.id));
  }

  protected startDrag(talkId: string): void {
    this.dragId.set(talkId);
  }

  protected dropOnCell(slotId: string, timeBlockId: string): void {
    const talkId = this.dragId() ?? this.selected();
    this.dragId.set(null);
    if (!talkId) {
      return;
    }
    this.assign(talkId, slotId, timeBlockId);
  }

  protected clickCell(slotId: string, timeBlockId: string, talk: Talk | null): void {
    if (talk) {
      this.unassignTalk(talk);
      return;
    }
    const talkId = this.selected();
    if (talkId) {
      this.assign(talkId, slotId, timeBlockId);
    }
  }

  protected dropOnPool(): void {
    const talkId = this.dragId();
    this.dragId.set(null);
    if (!talkId) {
      return;
    }
    const talk = (this.talksResource.value() ?? []).find((t) => t.id === talkId);
    if (talk) {
      this.unassignTalk(talk);
    }
  }

  private unassignTalk(talk: Talk): void {
    const confirmed = confirm(`Talk "${talk.title}" wirklich aus dem Zeitfenster entfernen?`);
    if (!confirmed) {
      return;
    }
    this.actionError.set(null);
    this.talksApi
      .assignTalkToSlot({ talkId: talk.id, assignmentRequest: { slotId: null, timeBlockId: null } })
      .subscribe({
        next: () => this.refresh(),
        error: (error: HttpErrorResponse) => this.handleAssignError(error),
      });
  }

  private assign(talkId: string, slotId: string, timeBlockId: string): void {
    this.actionError.set(null);
    this.talksApi.assignTalkToSlot({ talkId, assignmentRequest: { slotId, timeBlockId } }).subscribe({
      next: () => {
        this.selected.set(null);
        this.refresh();
      },
      error: (error: HttpErrorResponse) => this.handleAssignError(error),
    });
  }

  private handleAssignError(error: HttpErrorResponse): void {
    this.actionError.set(
      error.status === 409
        ? 'Zuordnung nicht möglich — Zeitfenster ist gesperrt, belegt oder die Kapazität ist erschöpft.'
        : 'Die Zuordnung konnte nicht gespeichert werden.',
    );
  }

  private refresh(): void {
    this.scheduleResource.reload();
    this.talksResource.reload();
  }
}

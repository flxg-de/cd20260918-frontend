import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { TalksService } from '../../../api/api/talks.service';
import { SlotsService } from '../../../api/api/slots.service';
import { Talk } from '../../../api/model/talk';
import { TalkStatus } from '../../../api/model/talk-status';
import { Slot } from '../../../api/model/slot';
import { injectIsOrganizer } from '../../core/auth/organizer-role';
import { talkStatusBadgeClasses, talkStatusLabel } from '../talk-status.util';

type StatusFilter = TalkStatus | 'ALL';

@Component({
  selector: 'app-talk-overview',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './talk-overview.component.html',
})
export class TalkOverviewComponent {
  private readonly api = inject(TalksService);
  private readonly slotsApi = inject(SlotsService);

  protected readonly isOrganizer = injectIsOrganizer();

  protected readonly statusFilter = signal<StatusFilter>('ALL');
  protected readonly actionError = signal<string | null>(null);
  protected readonly reassigningId = signal<string | null>(null);
  protected readonly rejectingId = signal<string | null>(null);
  protected readonly rejectionReason = signal<Record<string, string>>({});

  protected readonly talksResource = rxResource({
    stream: () => this.api.listTalks({}),
  });

  protected readonly slotsResource = rxResource({
    stream: () => this.slotsApi.listSlots({}),
  });

  protected readonly availableSlots = computed(() =>
    (this.slotsResource.value() ?? []).filter((slot) => !slot.locked),
  );

  protected readonly allTalks = computed(() => this.talksResource.value() ?? []);

  protected readonly counts = computed(() => {
    const talks = this.allTalks();
    return {
      submitted: talks.filter((t) => t.status === TalkStatus.SUBMITTED).length,
      assigned: talks.filter((t) => t.status === TalkStatus.ASSIGNED).length,
      rejected: talks.filter((t) => t.status === TalkStatus.REJECTED).length,
      total: talks.length,
    };
  });

  protected readonly filteredTalks = computed(() => {
    const filter = this.statusFilter();
    const talks = [...this.allTalks()].sort((a, b) => b.id.localeCompare(a.id));
    return filter === 'ALL' ? talks : talks.filter((t) => t.status === filter);
  });

  protected readonly statusLabel = talkStatusLabel;
  protected readonly statusBadgeClasses = talkStatusBadgeClasses;

  protected setStatusFilter(filter: StatusFilter): void {
    this.statusFilter.set(filter);
  }

  protected slotLabel(slot: Slot): string {
    return `${slot.startTime} – ${slot.endTime} · ${slot.room}`;
  }

  protected slotById(slotId: string | null | undefined): Slot | undefined {
    if (!slotId) {
      return undefined;
    }
    return this.slotsResource.value()?.find((slot) => slot.id === slotId);
  }

  protected reasonFor(talkId: string): string {
    return this.rejectionReason()[talkId] ?? '';
  }

  protected setReasonFor(talkId: string, value: string): void {
    this.rejectionReason.update((current) => ({ ...current, [talkId]: value }));
  }

  protected assignTalk(talk: Talk, slotId: string): void {
    this.actionError.set(null);
    this.reassigningId.set(talk.id);
    this.api
      .assignTalkToSlot({ talkId: talk.id, assignmentRequest: { slotId: slotId === '' ? null : slotId } })
      .subscribe({
        next: () => {
          this.reassigningId.set(null);
          this.talksResource.reload();
          this.slotsResource.reload();
        },
        error: (error: HttpErrorResponse) => {
          this.reassigningId.set(null);
          this.actionError.set(
            error.status === 409
              ? 'Der Slot ist bereits belegt oder gesperrt — Zuordnung nicht möglich.'
              : 'Die Zuordnung konnte nicht gespeichert werden.',
          );
        },
      });
  }

  protected rejectTalk(talk: Talk): void {
    this.actionError.set(null);
    this.rejectingId.set(talk.id);
    const reason = this.reasonFor(talk.id).trim();
    this.api
      .rejectTalk({ talkId: talk.id, rejectTalkRequest: reason === '' ? {} : { reason } })
      .subscribe({
        next: () => {
          this.rejectingId.set(null);
          this.talksResource.reload();
        },
        error: (error: HttpErrorResponse) => {
          this.rejectingId.set(null);
          this.actionError.set(
            error.status === 409
              ? 'Ein bereits zugeordneter Talk kann nicht abgelehnt werden.'
              : 'Der Talk konnte nicht abgelehnt werden.',
          );
        },
      });
  }
}

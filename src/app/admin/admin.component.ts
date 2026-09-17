import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { form, FormField, required } from '@angular/forms/signals';
import { CommunityDaysService } from '../../api/api/community-days.service';
import { CommunityDay } from '../../api/model/community-day';
import { CommunityDayPhase } from '../../api/model/community-day-phase';
import { SlotsService } from '../../api/api/slots.service';
import { Slot } from '../../api/model/slot';
import { SlotFormat } from '../../api/model/slot-format';
import { Location } from '../../api/model/location';
import { TimeBlocksService } from '../../api/api/time-blocks.service';
import { TimeBlock } from '../../api/model/time-block';
import { injectIsOrganizer } from '../core/auth/organizer-role';
import { CardComponent } from '../shared/card/card.component';
import { ChipComponent } from '../shared/chip/chip.component';
import { ButtonComponent } from '../shared/button/button.component';

interface EventFormModel {
  name: string;
  date: string;
  submissionDeadline: string;
  lateSubmissionDeadline: string;
}

interface SwimlaneFormModel {
  name: string;
  room: string;
  format: SlotFormat | '';
  location: Location | '';
}

interface TimeBlockFormModel {
  startTime: string;
  endTime: string;
  label: string;
  locked: boolean;
}

/** Order of the phases as they appear left-to-right in the phase chip row. */
const PHASE_ORDER: readonly CommunityDayPhase[] = [
  CommunityDayPhase.SUBMISSION,
  CommunityDayPhase.PLANNING,
  CommunityDayPhase.PUBLISHED,
];

/** Truncates an ISO 8601 timestamp to the `YYYY-MM-DDTHH:mm` shape `<input type="datetime-local">` expects. */
function toDatetimeLocal(iso: string | null | undefined): string {
  return iso ? iso.slice(0, 16) : '';
}

/** Combines the event date with an `HH:mm` value from `<input type="time">` into a full ISO 8601 date-time, as `TimeBlock.startTime`/`endTime` require. */
function toIsoDateTime(date: string, time: string): string {
  return `${date}T${time}:00`;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormField, CardComponent, ChipComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  private readonly communityDaysApi = inject(CommunityDaysService);
  private readonly slotsApi = inject(SlotsService);
  private readonly timeBlocksApi = inject(TimeBlocksService);

  protected readonly isOrganizer = injectIsOrganizer();
  protected readonly phaseOrder = PHASE_ORDER;

  // --- Current community day + event fields ---------------------------------

  protected readonly currentDayResource = rxResource({
    stream: () => this.communityDaysApi.getCurrentCommunityDay(),
  });

  private readonly communityDayId = computed(() => this.currentDayResource.value()?.id);

  protected readonly eventModel = signal<EventFormModel>({
    name: '',
    date: '',
    submissionDeadline: '',
    lateSubmissionDeadline: '',
  });

  protected readonly eventForm = form(this.eventModel, (path) => {
    required(path.name, { message: 'Name ist erforderlich' });
    required(path.date, { message: 'Datum ist erforderlich' });
  });

  protected readonly isSavingEvent = signal(false);
  protected readonly eventSaveError = signal<string | null>(null);
  protected readonly eventSaveSuccess = signal(false);

  protected readonly isTransitioning = signal(false);
  protected readonly transitionError = signal<string | null>(null);

  // --- Swimlanes (slots) ------------------------------------------------------

  protected readonly formatOptions = Object.values(SlotFormat);
  protected readonly locationOptions = Object.values(Location);

  protected readonly slotsResource = rxResource({
    stream: () => this.slotsApi.listSlots({}),
  });

  protected readonly sortedSlots = computed(() =>
    [...(this.slotsResource.value() ?? [])].sort((a, b) => a.name.localeCompare(b.name)),
  );

  protected readonly deletingSlotId = signal<string | null>(null);
  protected readonly slotError = signal<string | null>(null);

  protected readonly swimlaneModel = signal<SwimlaneFormModel>({
    name: '',
    room: '',
    format: '',
    location: '',
  });

  protected readonly swimlaneForm = form(this.swimlaneModel, (path) => {
    required(path.name, { message: 'Name ist erforderlich' });
    required(path.format, { message: 'Format ist erforderlich' });
  });

  protected readonly isCreatingSwimlane = signal(false);

  // --- Time grid (time blocks) -------------------------------------------------

  protected readonly timeBlocksResource = rxResource({
    stream: () => this.timeBlocksApi.listTimeBlocks({}),
  });

  protected readonly sortedTimeBlocks = computed(() =>
    [...(this.timeBlocksResource.value() ?? [])].sort((a, b) => a.startTime.localeCompare(b.startTime)),
  );

  /** Formats an ISO 8601 `TimeBlock.startTime`/`endTime` as `HH:mm` for display. */
  protected formatTime(iso: string): string {
    return iso.slice(11, 16) || iso;
  }

  protected readonly togglingTimeBlockId = signal<string | null>(null);
  protected readonly deletingTimeBlockId = signal<string | null>(null);
  protected readonly timeBlockError = signal<string | null>(null);

  protected readonly timeBlockModel = signal<TimeBlockFormModel>({
    startTime: '',
    endTime: '',
    label: '',
    locked: false,
  });

  protected readonly timeBlockForm = form(this.timeBlockModel, (path) => {
    required(path.startTime, { message: 'Startzeit ist erforderlich' });
    required(path.endTime, { message: 'Endzeit ist erforderlich' });
  });

  protected readonly isCreatingTimeBlock = signal(false);

  constructor() {
    // Seeds the event form from the loaded community day. Reruns whenever the
    // resource value changes identity (initial load, and after a successful
    // save/reload), which is fine since there are no unsaved edits at that point.
    effect(() => {
      const day = this.currentDayResource.value();
      if (!day) {
        return;
      }
      untracked(() =>
        this.eventModel.set({
          name: day.name,
          date: day.date,
          submissionDeadline: toDatetimeLocal(day.submissionDeadline),
          lateSubmissionDeadline: toDatetimeLocal(day.lateSubmissionDeadline),
        }),
      );
    });
  }

  protected saveEvent(event: Event): void {
    event.preventDefault();
    if (!this.eventForm().valid()) {
      return;
    }
    const communityDayId = this.communityDayId();
    if (!communityDayId) {
      return;
    }

    this.eventSaveError.set(null);
    this.eventSaveSuccess.set(false);
    this.isSavingEvent.set(true);

    const { name, date, submissionDeadline, lateSubmissionDeadline } = this.eventModel();

    this.communityDaysApi
      .updateCommunityDay({
        communityDayId,
        communityDayUpdateRequest: {
          name,
          date,
          submissionDeadline: submissionDeadline === '' ? null : submissionDeadline,
          lateSubmissionDeadline: lateSubmissionDeadline === '' ? null : lateSubmissionDeadline,
        },
      })
      .subscribe({
        next: () => {
          this.isSavingEvent.set(false);
          this.eventSaveSuccess.set(true);
          this.currentDayResource.reload();
        },
        error: (error: HttpErrorResponse) => {
          this.isSavingEvent.set(false);
          this.eventSaveError.set(
            error.status === 409
              ? 'Die Stammdaten konnten wegen eines Konflikts nicht gespeichert werden.'
              : 'Die Stammdaten konnten nicht gespeichert werden.',
          );
        },
      });
  }

  protected isPhaseActive(phase: CommunityDayPhase, day: CommunityDay): boolean {
    return day.phase === phase;
  }

  protected canTransitionTo(phase: CommunityDayPhase, day: CommunityDay): boolean {
    const currentIndex = PHASE_ORDER.indexOf(day.phase);
    const targetIndex = PHASE_ORDER.indexOf(phase);
    // Only the single next phase is reachable directly (SUBMISSION -> PLANNING
    // -> PUBLISHED); both transition endpoints move exactly one step forward.
    return currentIndex >= 0 && targetIndex === currentIndex + 1;
  }

  protected transitionToPhase(phase: CommunityDayPhase, day: CommunityDay): void {
    if (!this.canTransitionTo(phase, day)) {
      return;
    }

    this.transitionError.set(null);
    this.isTransitioning.set(true);

    const request$ =
      phase === CommunityDayPhase.PLANNING
        ? this.communityDaysApi.transitionToPlanning({ communityDayId: day.id })
        : this.communityDaysApi.transitionToPublished({ communityDayId: day.id });

    request$.subscribe({
      next: () => {
        this.isTransitioning.set(false);
        this.currentDayResource.reload();
      },
      error: (error: HttpErrorResponse) => {
        this.isTransitioning.set(false);
        this.transitionError.set(
          error.status === 409
            ? 'Der Phasenwechsel ist nicht möglich — der Community Day befindet sich bereits in dieser oder einer späteren Phase.'
            : 'Der Phasenwechsel ist fehlgeschlagen.',
        );
      },
    });
  }

  protected deleteSlot(slot: Slot): void {
    const confirmed = confirm(`Swimlane "${slot.name}" wirklich entfernen?`);
    if (!confirmed) {
      return;
    }

    this.slotError.set(null);
    this.deletingSlotId.set(slot.id);
    this.slotsApi.deleteSlot({ slotId: slot.id }).subscribe({
      next: () => {
        this.deletingSlotId.set(null);
        this.slotsResource.reload();
      },
      error: (error: HttpErrorResponse) => {
        this.deletingSlotId.set(null);
        this.slotError.set(
          error.status === 409
            ? 'Die Swimlane kann nicht entfernt werden, solange ihr Talks zugeordnet sind.'
            : 'Die Swimlane konnte nicht entfernt werden.',
        );
      },
    });
  }

  protected addSwimlane(event: Event): void {
    event.preventDefault();
    if (!this.swimlaneForm().valid()) {
      return;
    }

    this.slotError.set(null);
    this.isCreatingSwimlane.set(true);

    const { name, room, format, location } = this.swimlaneModel();

    this.slotsApi
      .createSlot({
        slotCreateRequest: {
          name,
          room: room === '' ? undefined : room,
          format: format as SlotFormat,
          location: location === '' ? undefined : location,
        },
      })
      .subscribe({
        next: () => {
          this.isCreatingSwimlane.set(false);
          this.swimlaneModel.set({ name: '', room: '', format: '', location: '' });
          this.slotsResource.reload();
        },
        error: (error: HttpErrorResponse) => {
          this.isCreatingSwimlane.set(false);
          this.slotError.set(
            error.status === 403
              ? 'Nur Organisatoren dürfen Swimlanes anlegen.'
              : 'Die Swimlane konnte nicht angelegt werden.',
          );
        },
      });
  }

  protected toggleTimeBlockLocked(timeBlock: TimeBlock): void {
    this.timeBlockError.set(null);
    this.togglingTimeBlockId.set(timeBlock.id);
    this.timeBlocksApi
      .updateTimeBlock({
        timeBlockId: timeBlock.id,
        timeBlockCreateRequest: {
          startTime: timeBlock.startTime,
          endTime: timeBlock.endTime,
          label: timeBlock.label,
          locked: !timeBlock.locked,
        },
      })
      .subscribe({
        next: () => {
          this.togglingTimeBlockId.set(null);
          this.timeBlocksResource.reload();
        },
        error: () => {
          this.togglingTimeBlockId.set(null);
          this.timeBlockError.set('Das Zeitfenster konnte nicht aktualisiert werden.');
        },
      });
  }

  protected deleteTimeBlock(timeBlock: TimeBlock): void {
    const confirmed = confirm('Zeitfenster wirklich entfernen?');
    if (!confirmed) {
      return;
    }

    this.timeBlockError.set(null);
    this.deletingTimeBlockId.set(timeBlock.id);
    this.timeBlocksApi.deleteTimeBlock({ timeBlockId: timeBlock.id }).subscribe({
      next: () => {
        this.deletingTimeBlockId.set(null);
        this.timeBlocksResource.reload();
      },
      error: (error: HttpErrorResponse) => {
        this.deletingTimeBlockId.set(null);
        this.timeBlockError.set(
          error.status === 409
            ? 'Das Zeitfenster kann nicht entfernt werden, solange ihm Talks zugeordnet sind.'
            : 'Das Zeitfenster konnte nicht entfernt werden.',
        );
      },
    });
  }

  protected addTimeBlock(event: Event): void {
    event.preventDefault();
    if (!this.timeBlockForm().valid()) {
      return;
    }

    this.timeBlockError.set(null);
    this.isCreatingTimeBlock.set(true);

    const { startTime, endTime, label, locked } = this.timeBlockModel();
    const eventDate = this.currentDayResource.value()?.date;
    if (!eventDate) {
      this.timeBlockError.set('Das Event-Datum ist noch nicht bekannt.');
      this.isCreatingTimeBlock.set(false);
      return;
    }

    this.timeBlocksApi
      .createTimeBlock({
        timeBlockCreateRequest: {
          startTime: toIsoDateTime(eventDate, startTime),
          endTime: toIsoDateTime(eventDate, endTime),
          label: label === '' ? undefined : label,
          locked,
        },
      })
      .subscribe({
        next: () => {
          this.isCreatingTimeBlock.set(false);
          this.timeBlockModel.set({ startTime: '', endTime: '', label: '', locked: false });
          this.timeBlocksResource.reload();
        },
        error: (error: HttpErrorResponse) => {
          this.isCreatingTimeBlock.set(false);
          this.timeBlockError.set(
            error.status === 403
              ? 'Nur Organisatoren dürfen Zeitfenster anlegen.'
              : 'Das Zeitfenster konnte nicht angelegt werden.',
          );
        },
      });
  }
}

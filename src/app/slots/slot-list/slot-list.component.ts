import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { SlotsService } from '../../../api/api/slots.service';
import { Slot } from '../../../api/model/slot';
import { injectIsOrganizer } from '../../core/auth/organizer-role';

/** Shape of the embedded `talk` field on a `Slot`, which the API types as a bare `object`. */
interface SlotTalk {
  title?: string;
}

@Component({
  selector: 'app-slot-list',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './slot-list.component.html',
})
export class SlotListComponent {
  private readonly api = inject(SlotsService);

  protected readonly isOrganizer = injectIsOrganizer();
  protected readonly deletingId = signal<string | null>(null);
  protected readonly deleteError = signal<string | null>(null);

  protected readonly slotsResource = rxResource({
    stream: () => this.api.listSlots({}),
  });

  protected readonly sortedSlots = computed(() =>
    [...(this.slotsResource.value() ?? [])].sort((a, b) => a.startTime.localeCompare(b.startTime)),
  );

  protected talkTitle(slot: Slot): string | null {
    const talk = slot.talk as SlotTalk | null | undefined;
    return talk?.title ?? null;
  }

  protected deleteSlot(slot: Slot): void {
    const confirmed = confirm(`Slot "${slot.room}" wirklich löschen?`);
    if (!confirmed) {
      return;
    }

    this.deleteError.set(null);
    this.deletingId.set(slot.id);
    this.api.deleteSlot({ slotId: slot.id }).subscribe({
      next: () => {
        this.deletingId.set(null);
        this.slotsResource.reload();
      },
      error: (error: HttpErrorResponse) => {
        this.deletingId.set(null);
        this.deleteError.set(
          error.status === 409
            ? 'Der Slot kann nicht gelöscht werden, solange ihm ein Talk zugeordnet ist.'
            : 'Der Slot konnte nicht gelöscht werden.',
        );
      },
    });
  }
}

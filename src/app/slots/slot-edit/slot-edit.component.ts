import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { form, FormField, required } from '@angular/forms/signals';
import { SlotsService } from '../../../api/api/slots.service';
import { SlotFormat } from '../../../api/model/slot-format';
import { Location } from '../../../api/model/location';

interface SlotEditFormModel {
  room: string;
  startTime: string;
  endTime: string;
  capacityMinutes: number;
  format: SlotFormat | '';
  location: Location | '';
  swimlane: string;
  locked: boolean;
  label: string;
}

const emptySlotModel: SlotEditFormModel = {
  room: '',
  startTime: '',
  endTime: '',
  capacityMinutes: 30,
  format: '',
  location: '',
  swimlane: '',
  locked: false,
  label: '',
};

@Component({
  selector: 'app-slot-edit',
  standalone: true,
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './slot-edit.component.html',
})
export class SlotEditComponent {
  readonly slotId = input.required<string>();

  private readonly api = inject(SlotsService);
  private readonly router = inject(Router);

  protected readonly formatOptions = Object.values(SlotFormat);
  protected readonly locationOptions = Object.values(Location);

  protected readonly isSubmitting = signal(false);
  protected readonly submitError = signal<string | null>(null);

  protected readonly slotResource = rxResource({
    params: () => ({ id: this.slotId() }),
    stream: ({ params }) => this.api.getSlot({ slotId: params.id }),
  });

  protected readonly slotModel = signal<SlotEditFormModel>({ ...emptySlotModel });

  protected readonly slotForm = form(this.slotModel, (path) => {
    required(path.room, { message: 'Raum ist erforderlich' });
    required(path.startTime, { message: 'Startzeit ist erforderlich' });
    required(path.endTime, { message: 'Endzeit ist erforderlich' });
    required(path.capacityMinutes, { message: 'Kapazität ist erforderlich' });
    required(path.format, { message: 'Format ist erforderlich' });
  });

  constructor() {
    // Syncs the form model from the loaded resource once — an external async
    // load, not derived state, so effect() rather than computed() is the
    // right tool here.
    effect(() => {
      const slot = this.slotResource.value();
      if (!slot) {
        return;
      }
      this.slotModel.set({
        room: slot.room,
        startTime: slot.startTime,
        endTime: slot.endTime,
        capacityMinutes: slot.capacityMinutes,
        format: slot.format,
        location: slot.location ?? '',
        swimlane: slot.swimlane ?? '',
        locked: slot.locked ?? false,
        label: slot.label ?? '',
      });
    });
  }

  protected submit(event: Event): void {
    event.preventDefault();
    if (!this.slotForm().valid()) {
      return;
    }

    this.submitError.set(null);
    this.isSubmitting.set(true);

    const { room, startTime, endTime, capacityMinutes, format, location, swimlane, locked, label } =
      this.slotModel();

    this.api
      .updateSlot({
        slotId: this.slotId(),
        slotCreateRequest: {
          room,
          startTime,
          endTime,
          capacityMinutes: Number(capacityMinutes),
          format: format as SlotFormat,
          location: location === '' ? undefined : location,
          swimlane: swimlane === '' ? undefined : swimlane,
          locked,
          label: label === '' ? undefined : label,
        },
      })
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          void this.router.navigate(['/slots']);
        },
        error: (error: HttpErrorResponse) => {
          this.isSubmitting.set(false);
          this.submitError.set(
            error.status === 403
              ? 'Nur Organisatoren dürfen Slots bearbeiten.'
              : 'Der Slot konnte nicht aktualisiert werden.',
          );
        },
      });
  }
}

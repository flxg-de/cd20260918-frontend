import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { form, FormField, required } from '@angular/forms/signals';
import { SlotsService } from '../../../api/api/slots.service';
import { SlotFormat } from '../../../api/model/slot-format';
import { Location } from '../../../api/model/location';

interface SlotCreateFormModel {
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

@Component({
  selector: 'app-slot-create',
  standalone: true,
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './slot-create.component.html',
})
export class SlotCreateComponent {
  private readonly api = inject(SlotsService);
  private readonly router = inject(Router);

  protected readonly formatOptions = Object.values(SlotFormat);
  protected readonly locationOptions = Object.values(Location);

  protected readonly isSubmitting = signal(false);
  protected readonly submitError = signal<string | null>(null);

  protected readonly slotModel = signal<SlotCreateFormModel>({
    room: '',
    startTime: '',
    endTime: '',
    capacityMinutes: 30,
    format: '',
    location: '',
    swimlane: '',
    locked: false,
    label: '',
  });

  protected readonly slotForm = form(this.slotModel, (path) => {
    required(path.room, { message: 'Raum ist erforderlich' });
    required(path.startTime, { message: 'Startzeit ist erforderlich' });
    required(path.endTime, { message: 'Endzeit ist erforderlich' });
    required(path.capacityMinutes, { message: 'Kapazität ist erforderlich' });
    required(path.format, { message: 'Format ist erforderlich' });
  });

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
      .createSlot({
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
              ? 'Nur Organisatoren dürfen Slots anlegen.'
              : 'Der Slot konnte nicht angelegt werden.',
          );
        },
      });
  }
}

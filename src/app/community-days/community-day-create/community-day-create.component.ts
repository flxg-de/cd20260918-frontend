import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { form, FormField, required } from '@angular/forms/signals';
import { CommunityDaysService } from '../../../api/api/community-days.service';

interface CommunityDayCreateFormModel {
  name: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-community-day-create',
  standalone: true,
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './community-day-create.component.html',
})
export class CommunityDayCreateComponent {
  private readonly api = inject(CommunityDaysService);
  private readonly router = inject(Router);

  protected readonly isSubmitting = signal(false);
  protected readonly submitError = signal<string | null>(null);

  protected readonly communityDayModel = signal<CommunityDayCreateFormModel>({
    name: '',
    description: '',
    date: '',
  });

  protected readonly communityDayForm = form(this.communityDayModel, (path) => {
    required(path.name, { message: 'Name ist erforderlich' });
    required(path.description, { message: 'Beschreibung ist erforderlich' });
    required(path.date, { message: 'Datum ist erforderlich' });
  });

  protected submit(event: Event): void {
    event.preventDefault();
    if (!this.communityDayForm().valid()) {
      return;
    }

    this.submitError.set(null);
    this.isSubmitting.set(true);

    const { name, description, date } = this.communityDayModel();
    this.api.createCommunityDay({ communityDayCreateRequest: { name, description, date } }).subscribe({
      next: (created) => {
        this.isSubmitting.set(false);
        void this.router.navigate(['/community-days', created.id]);
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        this.submitError.set(
          error.status === 403
            ? 'Nur Organisatoren dürfen Community Days anlegen.'
            : 'Der Community Day konnte nicht angelegt werden.',
        );
      },
    });
  }
}

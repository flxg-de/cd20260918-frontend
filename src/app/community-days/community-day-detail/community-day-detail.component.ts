import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { CommunityDaysService } from '../../../api/api/community-days.service';
import { CommunityDay } from '../../../api/model/community-day';
import { injectIsOrganizer } from '../../core/auth/organizer-role';

@Component({
  selector: 'app-community-day-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './community-day-detail.component.html',
})
export class CommunityDayDetailComponent {
  readonly communityDayId = input.required<string>();

  private readonly api = inject(CommunityDaysService);

  protected readonly isOrganizer = injectIsOrganizer();
  protected readonly isTransitioning = signal(false);
  protected readonly transitionError = signal<string | null>(null);

  protected readonly communityDayResource = rxResource({
    params: () => ({ id: this.communityDayId() }),
    stream: ({ params }) => this.api.getCommunityDay({ communityDayId: params.id }),
  });

  protected canTransitionToPlanning(day: CommunityDay): boolean {
    return this.isOrganizer() && day.phase === 'SUBMISSION';
  }

  protected transitionToPlanning(): void {
    this.transitionError.set(null);
    this.isTransitioning.set(true);
    this.api.transitionToPlanning({ communityDayId: this.communityDayId() }).subscribe({
      next: (updated) => {
        this.isTransitioning.set(false);
        this.communityDayResource.set(updated);
      },
      error: (error: HttpErrorResponse) => {
        this.isTransitioning.set(false);
        this.transitionError.set(
          error.status === 409
            ? 'Dieser Community Day befindet sich bereits in der Planungsphase oder ist abgeschlossen.'
            : 'Der Wechsel in die Planungsphase ist fehlgeschlagen.',
        );
      },
    });
  }
}

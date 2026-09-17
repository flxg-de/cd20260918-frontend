import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { TalksService } from '../../../api/api/talks.service';
import { CommunityDaysService } from '../../../api/api/community-days.service';
import { CommunityDayPhase } from '../../../api/model/community-day-phase';
import { Talk } from '../../../api/model/talk';
import { isTalkEditableByOwner, talkStatusBadgeClasses, talkStatusLabel } from '../talk-status.util';

@Component({
  selector: 'app-talk-mine',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './talk-mine.component.html',
})
export class TalkMineComponent {
  private readonly api = inject(TalksService);
  private readonly communityDaysApi = inject(CommunityDaysService);

  protected readonly withdrawingId = signal<string | null>(null);
  protected readonly withdrawError = signal<string | null>(null);

  protected readonly talksResource = rxResource({
    stream: () => this.api.listTalks({ mine: true }),
  });

  protected readonly currentDayResource = rxResource({
    stream: () => this.communityDaysApi.getCurrentCommunityDay(),
  });

  protected readonly canSubmitTalk = () =>
    this.currentDayResource.value()?.phase === CommunityDayPhase.SUBMISSION;

  protected readonly statusLabel = talkStatusLabel;
  protected readonly statusBadgeClasses = talkStatusBadgeClasses;
  protected readonly isEditable = isTalkEditableByOwner;

  protected withdrawTalk(talk: Talk): void {
    const confirmed = confirm(`Talk "${talk.title}" wirklich zurückziehen?`);
    if (!confirmed) {
      return;
    }

    this.withdrawError.set(null);
    this.withdrawingId.set(talk.id);
    this.api.withdrawTalk({ talkId: talk.id }).subscribe({
      next: () => {
        this.withdrawingId.set(null);
        this.talksResource.reload();
      },
      error: (error: HttpErrorResponse) => {
        this.withdrawingId.set(null);
        this.withdrawError.set(
          error.status === 409
            ? 'Der Talk kann nicht mehr zurückgezogen werden.'
            : 'Der Talk konnte nicht zurückgezogen werden.',
        );
      },
    });
  }
}

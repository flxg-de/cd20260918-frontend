import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TalksService } from '../../../api/api/talks.service';
import { Talk } from '../../../api/model/talk';
import { TalkStatus } from '../../../api/model/talk-status';
import { injectIsOrganizer } from '../../core/auth/organizer-role';
import { talkStatusBadgeClasses, talkStatusLabel, isTalkEditableByOwner } from '../talk-status.util';
import { CardComponent } from '../../shared/card/card.component';
import { ChipComponent } from '../../shared/chip/chip.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { StatusPillComponent } from '../../shared/status-pill/status-pill.component';

/** Filter chips available above the talk list — merges the old status tabs with slot/mine/favorite filters. */
type TalkFilter = 'ALL' | 'UNSCHEDULED' | 'SCHEDULED' | 'MINE' | 'FAVORITES' | 'REJECTED';

type SortMode = 'votes' | 'title';

@Component({
  selector: 'app-talk-list',
  standalone: true,
  imports: [RouterLink, CardComponent, ChipComponent, ButtonComponent, StatusPillComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './talk-list.component.html',
})
export class TalkListComponent {
  private readonly api = inject(TalksService);
  private readonly router = inject(Router);

  protected readonly isOrganizer = injectIsOrganizer();

  protected readonly filter = signal<TalkFilter>('ALL');
  protected readonly sortMode = signal<SortMode>('votes');
  protected readonly actionError = signal<string | null>(null);
  protected readonly votingId = signal<string | null>(null);
  protected readonly rejectingId = signal<string | null>(null);
  protected readonly withdrawingId = signal<string | null>(null);
  protected readonly rejectionReason = signal<Record<string, string>>({});

  protected readonly talksResource = rxResource({
    params: () => ({ filter: this.filter() }),
    stream: ({ params }) =>
      this.api.listTalks(
        params.filter === 'MINE'
          ? { mine: true }
          : params.filter === 'FAVORITES'
            ? { favorite: true }
            : {},
      ),
  });

  protected readonly statusLabel = talkStatusLabel;
  protected readonly statusBadgeClasses = talkStatusBadgeClasses;
  protected readonly isEditable = isTalkEditableByOwner;

  private readonly allTalks = computed(() => this.talksResource.value() ?? []);

  protected readonly stats = computed(() => {
    const talks = this.allTalks();
    const totalVotes = talks.reduce((sum, talk) => sum + (talk.votes ?? 0), 0);
    const assigned = talks.filter((talk) => talk.status === TalkStatus.ASSIGNED).length;
    const rejected = talks.filter((talk) => talk.status === TalkStatus.REJECTED).length;
    return [
      { value: String(talks.length), label: 'Einreichungen' },
      { value: `${assigned}/${talks.length}`, label: 'Eingeplant' },
      { value: String(totalVotes), label: 'Interessestimmen' },
      { value: String(rejected), label: 'Abgelehnt' },
    ];
  });

  protected readonly filteredTalks = computed(() => {
    const filter = this.filter();
    let talks = this.allTalks();

    switch (filter) {
      case 'UNSCHEDULED':
        talks = talks.filter((talk) => !talk.slotId);
        break;
      case 'SCHEDULED':
        talks = talks.filter((talk) => !!talk.slotId);
        break;
      case 'REJECTED':
        talks = talks.filter((talk) => talk.status === TalkStatus.REJECTED);
        break;
      // MINE and FAVORITES are already filtered server-side via the request.
    }

    const sort = this.sortMode();
    return [...talks].sort((a, b) =>
      sort === 'votes' ? (b.votes ?? 0) - (a.votes ?? 0) : a.title.localeCompare(b.title),
    );
  });

  protected setFilter(filter: TalkFilter): void {
    this.filter.set(filter);
  }

  protected toggleSort(): void {
    this.sortMode.update((mode) => (mode === 'votes' ? 'title' : 'votes'));
  }

  protected sortLabel(): string {
    return this.sortMode() === 'votes' ? 'Sortiert nach Stimmen' : 'Sortiert nach Titel';
  }

  protected reasonFor(talkId: string): string {
    return this.rejectionReason()[talkId] ?? '';
  }

  protected setReasonFor(talkId: string, value: string): void {
    this.rejectionReason.update((current) => ({ ...current, [talkId]: value }));
  }

  protected toggleVote(talk: Talk): void {
    this.actionError.set(null);
    this.votingId.set(talk.id);
    const request$ = talk.votedByMe
      ? this.api.removeVoteForTalk({ talkId: talk.id })
      : this.api.voteForTalk({ talkId: talk.id });
    request$.subscribe({
      next: () => {
        this.votingId.set(null);
        this.talksResource.reload();
      },
      error: () => {
        this.votingId.set(null);
        this.actionError.set('Die Stimme konnte nicht gespeichert werden.');
      },
    });
  }

  protected planTalk(talk: Talk): void {
    this.router.navigate(['/board'], { queryParams: { talkId: talk.id } });
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

  protected withdrawTalk(talk: Talk): void {
    const confirmed = confirm(`Talk "${talk.title}" wirklich zurückziehen?`);
    if (!confirmed) {
      return;
    }

    this.actionError.set(null);
    this.withdrawingId.set(talk.id);
    this.api.withdrawTalk({ talkId: talk.id }).subscribe({
      next: () => {
        this.withdrawingId.set(null);
        this.talksResource.reload();
      },
      error: (error: HttpErrorResponse) => {
        this.withdrawingId.set(null);
        this.actionError.set(
          error.status === 409
            ? 'Der Talk kann nicht mehr zurückgezogen werden.'
            : 'Der Talk konnte nicht zurückgezogen werden.',
        );
      },
    });
  }
}

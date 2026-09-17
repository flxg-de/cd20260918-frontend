import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { form, FormField, maxLength, required } from '@angular/forms/signals';
import { TalksService } from '../../../api/api/talks.service';
import { CommunityDaysService } from '../../../api/api/community-days.service';
import { CommunityDayPhase } from '../../../api/model/community-day-phase';

interface TalkCreateFormModel {
  title: string;
  description: string;
  durationMinutes: number;
}

@Component({
  selector: 'app-talk-create',
  standalone: true,
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './talk-create.component.html',
})
export class TalkCreateComponent {
  private readonly api = inject(TalksService);
  private readonly communityDaysApi = inject(CommunityDaysService);
  private readonly router = inject(Router);

  protected readonly isSubmitting = signal(false);
  protected readonly submitError = signal<string | null>(null);

  protected readonly currentDayResource = rxResource({
    stream: () => this.communityDaysApi.getCurrentCommunityDay(),
  });

  protected readonly canSubmitTalk = () =>
    this.currentDayResource.value()?.phase === CommunityDayPhase.SUBMISSION;

  protected readonly speakers = signal<string[]>(['']);
  protected readonly speakersError = signal<string | null>(null);
  protected readonly tags = signal<string[]>([]);
  protected readonly newTag = signal('');

  protected readonly talkModel = signal<TalkCreateFormModel>({
    title: '',
    description: '',
    durationMinutes: 30,
  });

  protected readonly talkForm = form(this.talkModel, (path) => {
    required(path.title, { message: 'Titel ist erforderlich' });
    maxLength(path.title, 120, { message: 'Titel darf höchstens 120 Zeichen lang sein' });
    maxLength(path.description, 2000, { message: 'Beschreibung darf höchstens 2000 Zeichen lang sein' });
    required(path.durationMinutes, { message: 'Dauer ist erforderlich' });
  });

  protected addSpeaker(): void {
    this.speakers.update((current) => [...current, '']);
  }

  protected removeSpeaker(index: number): void {
    this.speakers.update((current) => current.filter((_, i) => i !== index));
  }

  protected updateSpeaker(index: number, value: string): void {
    this.speakers.update((current) => current.map((s, i) => (i === index ? value : s)));
  }

  protected addTag(): void {
    const value = this.newTag().trim();
    if (value === '') {
      return;
    }
    this.tags.update((current) => [...current, value]);
    this.newTag.set('');
  }

  protected removeTag(index: number): void {
    this.tags.update((current) => current.filter((_, i) => i !== index));
  }

  private validSpeakers(): string[] | null {
    const trimmed = this.speakers().map((s) => s.trim()).filter((s) => s !== '');
    if (trimmed.length === 0) {
      this.speakersError.set('Mindestens ein/e Sprecher/in ist erforderlich.');
      return null;
    }
    const invalid = trimmed.some((s) => s.length < 2 || s.length > 80);
    if (invalid) {
      this.speakersError.set('Jeder Sprecher/innen-Name muss zwischen 2 und 80 Zeichen lang sein.');
      return null;
    }
    this.speakersError.set(null);
    return trimmed;
  }

  protected submit(event: Event): void {
    event.preventDefault();
    if (!this.talkForm().valid()) {
      return;
    }

    const speakers = this.validSpeakers();
    if (speakers === null) {
      return;
    }

    this.submitError.set(null);
    this.isSubmitting.set(true);

    const { title, description, durationMinutes } = this.talkModel();

    this.api
      .createTalk({
        talkCreateRequest: {
          title,
          speakers,
          description: description === '' ? undefined : description,
          durationMinutes: Number(durationMinutes),
          tags: this.tags().length > 0 ? this.tags() : undefined,
        },
      })
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          void this.router.navigate(['/talks/mine']);
        },
        error: (error: HttpErrorResponse) => {
          this.isSubmitting.set(false);
          this.submitError.set(
            error.status === 409
              ? 'Talks können nur während der Einreichungsphase eingereicht werden.'
              : 'Der Talk konnte nicht eingereicht werden.',
          );
        },
      });
  }
}

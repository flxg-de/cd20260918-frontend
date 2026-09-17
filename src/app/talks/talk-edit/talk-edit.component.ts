import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { form, FormField, maxLength, required } from '@angular/forms/signals';
import { TalksService } from '../../../api/api/talks.service';

interface TalkEditFormModel {
  title: string;
  description: string;
  durationMinutes: number;
}

const emptyTalkModel: TalkEditFormModel = {
  title: '',
  description: '',
  durationMinutes: 30,
};

@Component({
  selector: 'app-talk-edit',
  standalone: true,
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './talk-edit.component.html',
})
export class TalkEditComponent {
  readonly talkId = input.required<string>();

  private readonly api = inject(TalksService);
  private readonly router = inject(Router);

  protected readonly isSubmitting = signal(false);
  protected readonly submitError = signal<string | null>(null);

  protected readonly talkResource = rxResource({
    params: () => ({ id: this.talkId() }),
    stream: ({ params }) => this.api.getTalk({ talkId: params.id }),
  });

  protected readonly speakers = signal<string[]>(['']);
  protected readonly speakersError = signal<string | null>(null);
  protected readonly tags = signal<string[]>([]);
  protected readonly newTag = signal('');

  protected readonly talkModel = signal<TalkEditFormModel>({ ...emptyTalkModel });

  protected readonly talkForm = form(this.talkModel, (path) => {
    required(path.title, { message: 'Titel ist erforderlich' });
    maxLength(path.title, 120, { message: 'Titel darf höchstens 120 Zeichen lang sein' });
    maxLength(path.description, 2000, { message: 'Beschreibung darf höchstens 2000 Zeichen lang sein' });
    required(path.durationMinutes, { message: 'Dauer ist erforderlich' });
  });

  constructor() {
    // Syncs the form model from the loaded resource once — an external async
    // load, not derived state, so effect() rather than computed() is the
    // right tool here (same pattern as SlotEditComponent).
    effect(() => {
      const talk = this.talkResource.value();
      if (!talk) {
        return;
      }
      this.talkModel.set({
        title: talk.title,
        description: talk.description ?? '',
        durationMinutes: talk.durationMinutes,
      });
      this.speakers.set(talk.speakers.length > 0 ? [...talk.speakers] : ['']);
      this.tags.set(talk.tags ? [...talk.tags] : []);
    });
  }

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
      .updateTalk({
        talkId: this.talkId(),
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
              ? 'Der Talk kann nicht mehr bearbeitet werden.'
              : 'Der Talk konnte nicht aktualisiert werden.',
          );
        },
      });
  }
}

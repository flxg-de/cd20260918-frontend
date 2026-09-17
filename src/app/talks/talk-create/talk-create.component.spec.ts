import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TalksService } from '../../../api/api/talks.service';
import { CommunityDaysService } from '../../../api/api/community-days.service';
import { CommunityDay } from '../../../api/model/community-day';
import { Talk } from '../../../api/model/talk';
import { TalkStatus } from '../../../api/model/talk-status';
import { TalkCreateComponent } from './talk-create.component';

function stubCommunityDaysService(phase: CommunityDay['phase']): CommunityDaysService {
  return {
    getCurrentCommunityDay: () =>
      of({
        id: 'cd-1',
        name: 'CD',
        description: '',
        date: '2026-09-18',
        submissionDeadline: '2026-09-01',
        lateSubmissionDeadline: null,
        phase,
      } as CommunityDay),
  } as unknown as CommunityDaysService;
}

function stubTalksService(myTalks: Talk[] = []): TalksService {
  return {
    createTalk: () => of({}),
    listTalks: () => of(myTalks),
  } as unknown as TalksService;
}

describe('TalkCreateComponent', () => {
  function configureTestBed(communityDaysApi: CommunityDaysService, talksApi: TalksService = stubTalksService()): void {
    TestBed.configureTestingModule({
      imports: [TalkCreateComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: TalksService, useValue: talksApi },
        { provide: CommunityDaysService, useValue: communityDaysApi },
      ],
    });
  }

  it('marks the form invalid when the title is empty', async () => {
    configureTestBed(stubCommunityDaysService('SUBMISSION'));

    const fixture = TestBed.createComponent(TalkCreateComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance;
    expect(component['talkForm']().valid()).toBe(false);
  });

  it('becomes valid once required fields are filled and at least one speaker is present', async () => {
    configureTestBed(stubCommunityDaysService('SUBMISSION'));

    const fixture = TestBed.createComponent(TalkCreateComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance;
    component['talkModel'].set({ title: 'Ein toller Talk', description: '', durationMinutes: 30 });
    component['speakers'].set(['Alice']);
    fixture.detectChanges();

    expect(component['talkForm']().valid()).toBe(true);
  });

  it('shows an explanatory note instead of the form outside the submission phase', async () => {
    configureTestBed(stubCommunityDaysService('PLANNING'));

    const fixture = TestBed.createComponent(TalkCreateComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeFalsy();
    expect(compiled.textContent).toContain('nicht möglich');
  });

  it('shows the submission deadline in the timeline sidebar', async () => {
    configureTestBed(stubCommunityDaysService('SUBMISSION'));

    const fixture = TestBed.createComponent(TalkCreateComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('#Ablauf');
    expect(compiled.textContent).not.toContain('undefined');
  });

  it('lists the own talks with their status in the sidebar', async () => {
    const myTalk = {
      id: 't-1',
      title: 'Mein Talk',
      speakers: ['Alice'],
      durationMinutes: 30,
      communityDayId: 'cd-1',
      status: TalkStatus.SUBMITTED,
      votes: 3,
    } as Talk;
    configureTestBed(stubCommunityDaysService('SUBMISSION'), stubTalksService([myTalk]));

    const fixture = TestBed.createComponent(TalkCreateComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Mein Talk');
    expect(compiled.textContent).toContain('Eingereicht');
    expect(compiled.textContent).toContain('3 Stimmen');
  });
});

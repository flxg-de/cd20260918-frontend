import { TestBed } from '@angular/core/testing';
import { Observable, of, Subject } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CommunityDaysService } from '../../../api/api/community-days.service';
import { CommunityDay } from '../../../api/model/community-day';
import { CommunityDayListComponent } from './community-day-list.component';

const communityDay = (overrides: Partial<CommunityDay> = {}): CommunityDay => ({
  id: '1',
  name: 'Herbst Community Day',
  description: 'Beschreibung',
  date: '2026-10-01',
  phase: 'SUBMISSION',
  ...overrides,
});

function stubCommunityDaysService(
  listCommunityDays: () => Observable<CommunityDay[]>,
  getCurrentCommunityDay: () => Observable<CommunityDay>,
): CommunityDaysService {
  return { listCommunityDays, getCurrentCommunityDay } as unknown as CommunityDaysService;
}

describe('CommunityDayListComponent', () => {
  function configureTestBed(api: CommunityDaysService): void {
    TestBed.configureTestingModule({
      imports: [CommunityDayListComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: CommunityDaysService, useValue: api },
      ],
    });
  }

  it('shows a loading indicator while community days are being fetched', async () => {
    const pendingList = new Subject<CommunityDay[]>();
    const pendingCurrent = new Subject<CommunityDay>();
    configureTestBed(
      stubCommunityDaysService(() => pendingList.asObservable(), () => pendingCurrent.asObservable()),
    );

    const fixture = TestBed.createComponent(CommunityDayListComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Lade Community Days');
  });

  it('renders the list of community days once loaded', async () => {
    const days = [
      communityDay({ id: '1', name: 'Herbst Community Day' }),
      communityDay({ id: '2', name: 'Frühjahrs Community Day' }),
    ];
    configureTestBed(stubCommunityDaysService(() => of(days), () => of(days[0])));

    const fixture = TestBed.createComponent(CommunityDayListComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('li');
    expect(items.length).toBe(2);
    expect(compiled.textContent).toContain('Herbst Community Day');
    expect(compiled.textContent).toContain('Frühjahrs Community Day');
  });
});

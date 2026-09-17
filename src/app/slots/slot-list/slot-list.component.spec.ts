import { TestBed } from '@angular/core/testing';
import { Observable, of, Subject } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { SlotsService } from '../../../api/api/slots.service';
import { Slot } from '../../../api/model/slot';
import { SlotListComponent } from './slot-list.component';

const slot = (overrides: Partial<Slot> = {}): Slot => ({
  id: '1',
  communityDayId: 'cd-1',
  room: 'Raum A',
  startTime: '2026-10-01T09:00',
  endTime: '2026-10-01T09:30',
  capacityMinutes: 30,
  format: 'ON_SITE',
  ...overrides,
});

function stubSlotsService(listSlots: () => Observable<Slot[]>): SlotsService {
  return { listSlots, deleteSlot: () => of({}) } as unknown as SlotsService;
}

function stubOAuthService(roles: string[]): OAuthService {
  return {
    events: new Subject(),
    getIdentityClaims: () => ({ realm_access: { roles } }),
  } as unknown as OAuthService;
}

describe('SlotListComponent', () => {
  function configureTestBed(api: SlotsService, oauth: OAuthService): void {
    TestBed.configureTestingModule({
      imports: [SlotListComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: SlotsService, useValue: api },
        { provide: OAuthService, useValue: oauth },
      ],
    });
  }

  it('shows a loading indicator while slots are being fetched', () => {
    const pending = new Subject<Slot[]>();
    configureTestBed(stubSlotsService(() => pending.asObservable()), stubOAuthService([]));

    const fixture = TestBed.createComponent(SlotListComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Lade Slots');
  });

  it('renders the slot schedule sorted by start time once loaded', async () => {
    const slots = [
      slot({ id: '2', room: 'Raum B', startTime: '2026-10-01T11:00', endTime: '2026-10-01T11:30' }),
      slot({ id: '1', room: 'Raum A', startTime: '2026-10-01T09:00', endTime: '2026-10-01T09:30' }),
    ];
    configureTestBed(stubSlotsService(() => of(slots)), stubOAuthService([]));

    const fixture = TestBed.createComponent(SlotListComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('li');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('Raum A');
    expect(items[1].textContent).toContain('Raum B');
  });

  it('hides the "Neuen Slot anlegen" control for a non-organizer', async () => {
    configureTestBed(stubSlotsService(() => of([])), stubOAuthService([]));

    const fixture = TestBed.createComponent(SlotListComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).not.toContain('Neuen Slot anlegen');
  });

  it('shows the "Neuen Slot anlegen" control for an organizer', async () => {
    configureTestBed(stubSlotsService(() => of([])), stubOAuthService(['ORGANISATOR']));

    const fixture = TestBed.createComponent(SlotListComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Neuen Slot anlegen');
  });
});

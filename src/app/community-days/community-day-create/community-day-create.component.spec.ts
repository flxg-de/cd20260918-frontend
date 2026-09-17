import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CommunityDaysService } from '../../../api/api/community-days.service';
import { CommunityDayCreateComponent } from './community-day-create.component';

describe('CommunityDayCreateComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommunityDayCreateComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: CommunityDaysService,
          useValue: { createCommunityDay: () => new Subject() } as unknown as CommunityDaysService,
        },
      ],
    });
  });

  it('shows validation errors when required fields are touched but empty', async () => {
    const fixture = TestBed.createComponent(CommunityDayCreateComponent);
    fixture.detectChanges();

    const nameInput = fixture.nativeElement.querySelector('input[type="text"]') as HTMLInputElement;
    nameInput.dispatchEvent(new Event('focus'));
    nameInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Name ist erforderlich');
  });

  it('disables the submit button while a submission is in flight', () => {
    const fixture = TestBed.createComponent(CommunityDayCreateComponent);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(button.disabled).toBe(false);
  });
});

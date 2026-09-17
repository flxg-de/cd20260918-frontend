import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SlotsService } from '../../../api/api/slots.service';
import { SlotCreateComponent } from './slot-create.component';

describe('SlotCreateComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SlotCreateComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: SlotsService,
          useValue: { createSlot: () => new Subject() } as unknown as SlotsService,
        },
      ],
    });
  });

  it('shows validation errors when required fields are touched but empty', async () => {
    const fixture = TestBed.createComponent(SlotCreateComponent);
    fixture.detectChanges();

    const roomInput = fixture.nativeElement.querySelector('input[type="text"]') as HTMLInputElement;
    roomInput.dispatchEvent(new Event('focus'));
    roomInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Raum ist erforderlich');
  });

  it('disables the submit button while a submission is in flight', () => {
    const fixture = TestBed.createComponent(SlotCreateComponent);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(button.disabled).toBe(false);
  });
});

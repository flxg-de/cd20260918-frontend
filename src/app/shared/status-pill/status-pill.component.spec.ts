import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { StatusPillComponent } from './status-pill.component';

describe('StatusPillComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StatusPillComponent],
      providers: [provideZonelessChangeDetection()],
    });
  });

  it('renders the label', async () => {
    const fixture = TestBed.createComponent(StatusPillComponent);
    fixture.componentRef.setInput('label', 'Eingereicht');
    fixture.detectChanges();
    await fixture.whenStable();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Eingereicht');
  });

  it('uses variant classes when no badgeClass is provided', async () => {
    const fixture = TestBed.createComponent(StatusPillComponent);
    fixture.componentRef.setInput('label', 'Zugeordnet');
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    await fixture.whenStable();

    const span = (fixture.nativeElement as HTMLElement).querySelector('span')!;
    expect(span.className).toContain('bg-green-50');
  });

  it('prefers a precomputed badgeClass over the variant', async () => {
    const fixture = TestBed.createComponent(StatusPillComponent);
    fixture.componentRef.setInput('label', 'Abgelehnt');
    fixture.componentRef.setInput('variant', 'success');
    fixture.componentRef.setInput('badgeClass', 'bg-oc-red/10 text-oc-red');
    fixture.detectChanges();
    await fixture.whenStable();

    const span = (fixture.nativeElement as HTMLElement).querySelector('span')!;
    expect(span.className).toContain('bg-oc-red/10');
    expect(span.className).not.toContain('bg-green-50');
  });
});

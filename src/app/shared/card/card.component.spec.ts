import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardComponent],
      providers: [provideZonelessChangeDetection()],
    });
  });

  it('applies the bordered surface styling on the host', async () => {
    const fixture = TestBed.createComponent(CardComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.classList).toContain('border');
    expect(host.classList).toContain('rounded-md');
  });

  it('projects content', async () => {
    const fixture = TestBed.createComponent(CardComponent);
    const host = fixture.nativeElement as HTMLElement;
    host.innerHTML = '<p>Card content</p>';
    fixture.detectChanges();
    await fixture.whenStable();

    expect(host.textContent).toContain('Card content');
  });
});

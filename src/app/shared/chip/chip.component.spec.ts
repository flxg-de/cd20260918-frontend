import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ChipComponent } from './chip.component';

describe('ChipComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChipComponent],
      providers: [provideZonelessChangeDetection()],
    });
  });

  it('renders the label', async () => {
    const fixture = TestBed.createComponent(ChipComponent);
    fixture.componentRef.setInput('label', 'Backend');
    fixture.detectChanges();
    await fixture.whenStable();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Backend');
  });

  it('applies the active styling when active is true', async () => {
    const fixture = TestBed.createComponent(ChipComponent);
    fixture.componentRef.setInput('label', 'Backend');
    fixture.componentRef.setInput('active', true);
    fixture.detectChanges();
    await fixture.whenStable();

    const button = (fixture.nativeElement as HTMLElement).querySelector('button')!;
    expect(button.classList).toContain('bg-oc-blue');
  });

  it('emits clicked when pressed', async () => {
    const fixture = TestBed.createComponent(ChipComponent);
    fixture.componentRef.setInput('label', 'Backend');
    fixture.detectChanges();
    await fixture.whenStable();

    const clicked = vi.fn();
    fixture.componentInstance.clicked.subscribe(clicked);
    (fixture.nativeElement as HTMLElement).querySelector('button')!.click();

    expect(clicked).toHaveBeenCalled();
  });
});

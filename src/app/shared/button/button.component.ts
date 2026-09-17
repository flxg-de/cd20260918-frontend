import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';

/** Renders an actual `<button>` so it composes with `[disabled]`, `(click)`, and forms. */
@Component({
  selector: 'app-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      class="rounded-md px-6 py-3 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50"
      [class.bg-oc-blue]="variant() === 'primary'"
      [class.text-oc-white]="variant() === 'primary'"
      [class.border-transparent]="variant() === 'primary'"
      [class.bg-oc-white]="variant() !== 'primary'"
      [class.border]="true"
      [class.border-oc-blue]="variant() === 'outline'"
      [class.text-oc-blue]="variant() === 'outline'"
      [class.border-oc-gray-300]="variant() === 'ghost'"
      [class.text-oc-ink]="variant() === 'ghost'"
    >
      <ng-content />
    </button>
  `,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
}

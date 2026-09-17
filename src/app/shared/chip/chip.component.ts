import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/**
 * A toggleable pill button ("chip") used for filters/selection groups.
 * Purely presentational — the parent owns the active state and click handling.
 */
@Component({
  selector: 'app-chip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="rounded-full px-[15px] py-[7px] text-[13px] font-semibold transition-colors duration-200"
      [class.bg-oc-blue]="active()"
      [class.text-oc-white]="active()"
      [class.border-transparent]="active()"
      [class.bg-oc-white]="!active()"
      [class.text-oc-gray-600]="!active()"
      [class.border-oc-gray-300]="!active()"
      [class.border]="!active()"
      (click)="clicked.emit()"
    >
      {{ label() }}
    </button>
  `,
})
export class ChipComponent {
  readonly label = input.required<string>();
  readonly active = input(false);
  readonly clicked = output<void>();
}

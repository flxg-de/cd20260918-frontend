import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Semantic variants mapped to OC status colors; used when no precomputed classes are given. */
export type StatusPillVariant = 'info' | 'neutral' | 'danger' | 'success';

const VARIANT_CLASSES: Record<StatusPillVariant, string> = {
  info: 'bg-oc-blue-50 text-oc-blue-700',
  neutral: 'bg-oc-gray-100 text-oc-ink',
  danger: 'bg-oc-red/10 text-oc-red',
  success: 'bg-green-50 text-green-700',
};

/**
 * Small uppercase pill badge for status/mode labels.
 *
 * Accepts either a `variant` (mapped to OC semantic colors) or precomputed
 * `badgeClass` Tailwind classes — e.g. from `talkStatusBadgeClasses()` — so
 * existing label/class logic (see `talk-status.util.ts`) does not need to be
 * duplicated or rewritten to fit this component.
 */
@Component({
  selector: 'app-status-pill',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="inline-block rounded-full px-[15px] py-[7px] text-[13px] font-semibold uppercase tracking-wide"
      [class]="resolvedClass()"
    >
      {{ label() }}
    </span>
  `,
})
export class StatusPillComponent {
  readonly label = input.required<string>();
  readonly variant = input<StatusPillVariant>('neutral');
  readonly badgeClass = input<string | undefined>(undefined);

  protected readonly resolvedClass = computed(() => this.badgeClass() ?? VARIANT_CLASSES[this.variant()]);
}

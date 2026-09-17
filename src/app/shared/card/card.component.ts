import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * White bordered surface, the base building block for cards across the app.
 * Deliberately unpadded — callers control inner spacing so it composes with
 * the different paddings used in the mockup (e.g. 24px card padding vs.
 * tighter nested cards).
 */
@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    class: 'block bg-oc-white border border-oc-gray-200 rounded-md',
  },
})
export class CardComponent {}

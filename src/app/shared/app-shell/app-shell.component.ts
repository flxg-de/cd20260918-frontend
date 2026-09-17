import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommunityDaysService } from '../../../api/api/community-days.service';
import { CommunityDayPhase } from '../../../api/model/community-day-phase';
import { injectIsOrganizer } from '../../core/auth/organizer-role';

interface NavTab {
  readonly label: string;
  readonly path: string;
}

const NAV_TABS: readonly NavTab[] = [
  { label: 'Einreichen', path: '/submit' },
  { label: 'Einreichungen', path: '/talks' },
  { label: 'Planung', path: '/board' },
  { label: 'Programm', path: '/program' },
  { label: 'Mein Tag', path: '/my-day' },
];

const PHASE_LABELS: Record<CommunityDayPhase, string> = {
  SUBMISSION: 'Einreichungsphase',
  PLANNING: 'Planungsphase',
  PUBLISHED: 'Programm veröffentlicht',
  COMPLETED: 'Abgeschlossen',
};

/**
 * Top header + tab navigation shell, wrapping the routed pages via
 * `<router-outlet>`. Fetches the current community day itself (same
 * `rxResource` + `getCurrentCommunityDay()` pattern used elsewhere)
 * so it stays self-contained for the wrapping layout route.
 */
@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-shell.component.html',
})
export class AppShellComponent {
  private readonly communityDaysApi = inject(CommunityDaysService);

  protected readonly navTabs = NAV_TABS;
  protected readonly isOrganizer = injectIsOrganizer();

  protected readonly currentDayResource = rxResource({
    stream: () => this.communityDaysApi.getCurrentCommunityDay(),
  });

  protected readonly phaseLabel = computed(() => {
    const phase = this.currentDayResource.value()?.phase;
    return phase ? PHASE_LABELS[phase] : undefined;
  });
}

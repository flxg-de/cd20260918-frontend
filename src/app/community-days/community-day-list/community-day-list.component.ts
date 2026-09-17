import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CommunityDaysService } from '../../../api/api/community-days.service';
import { injectIsOrganizer } from '../../core/auth/organizer-role';

@Component({
  selector: 'app-community-day-list',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './community-day-list.component.html',
})
export class CommunityDayListComponent {
  private readonly api = inject(CommunityDaysService);

  protected readonly isOrganizer = injectIsOrganizer();

  protected readonly communityDaysResource = rxResource({
    stream: () => this.api.listCommunityDays(),
  });

  protected readonly currentResource = rxResource({
    stream: () => this.api.getCurrentCommunityDay(),
  });

  protected isCurrent(id: string): boolean {
    return this.currentResource.value()?.id === id;
  }
}

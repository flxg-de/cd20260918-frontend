import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { CommunityDaysService } from '../../../api/api/community-days.service';
import { CommunityDay } from '../../../api/model/community-day';
import { AppShellComponent } from './app-shell.component';

function stubCommunityDaysService(day: CommunityDay): CommunityDaysService {
  return { getCurrentCommunityDay: () => of(day) } as unknown as CommunityDaysService;
}

function fakeAccessToken(roles: string[]): string {
  const payload = btoa(JSON.stringify({ realm_access: { roles } }));
  return `header.${payload}.signature`;
}

function stubOAuthService(roles: string[]): OAuthService {
  return {
    events: new Subject(),
    getAccessToken: () => fakeAccessToken(roles),
  } as unknown as OAuthService;
}

const communityDay: CommunityDay = {
  id: 'cd-1',
  name: 'Community Day München',
  description: '',
  date: '2026-09-18',
  phase: 'PLANNING',
};

describe('AppShellComponent', () => {
  function configureTestBed(day: CommunityDay, oauth: OAuthService): void {
    TestBed.configureTestingModule({
      imports: [AppShellComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: CommunityDaysService, useValue: stubCommunityDaysService(day) },
        { provide: OAuthService, useValue: oauth },
      ],
    });
  }

  it('renders the community day name and phase label once loaded', async () => {
    configureTestBed(communityDay, stubOAuthService([]));

    const fixture = TestBed.createComponent(AppShellComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Community Day München');
    expect(compiled.textContent).toContain('Planungsphase');
  });

  it('renders all nav tabs but hides the Admin tab for a non-organizer', async () => {
    configureTestBed(communityDay, stubOAuthService([]));

    const fixture = TestBed.createComponent(AppShellComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Einreichen');
    expect(compiled.textContent).toContain('Mein Tag');
    expect(compiled.textContent).not.toContain('Admin');
  });

  it('shows the Admin tab for an organizer', async () => {
    configureTestBed(communityDay, stubOAuthService(['ORGANISATOR']));

    const fixture = TestBed.createComponent(AppShellComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Admin');
  });
});

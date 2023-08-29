import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserProfile } from '../../auth/interfaces/user-profile.interface';
import { AuthService } from '../../auth/services/auth.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { APP_ROUTES } from '../../../shared/constants/app-routes.const';
import { NAVIGATION_PAGE_DATA } from '../constants/navigation-page-data.const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  protected userProfile: UserProfile | null = null;
  protected readonly NAVIGATION_PAGE_DATA = NAVIGATION_PAGE_DATA;
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.getUserProfileData();
  }

  private getUserProfileData(): void {
    this.loaderService.start();
    this.authService
      .getUserProfile()
      .pipe(
        finalize(() => {
          this.loaderService.stop();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (data: UserProfile) => {
          if (!data) {
            return;
          }
          this.userProfile = data;
          console.log(this.userProfile, 'userProfile');
        },
      });
  }

  protected onLogout(): void {
    this.authService.resetAuthToken();
    this.router.navigate([APP_ROUTES.LOGOUT]);
  }

  protected onNavigateByUrl(url: string): void {
    this.router.navigate([url]);
  }
}

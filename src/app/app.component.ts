import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { AuthService } from './core/auth/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  protected isUserAuth = false;
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isUserAuthenticated();
  }

  private isUserAuthenticated(): void {
    this.authService.authTokenChanges$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isUserAuth = !!this.authService.getAuthToken();
        },
      });
  }
}

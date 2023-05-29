import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CREDENTIALS } from '../../../../../app/credentials/credentials.conts';
import { APP_ROUTES } from '../../../../shared/constants/app-routes.const';

/**
 * Google auth variable
 */
declare const google: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  protected googleApiAccountsRef: any;

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit(): void {
    if (this.authService.getAuthToken()) {
      this.navigateToBooksOverview();
    } else {
      this.googleApiAccountsRef = google.accounts.oauth2.initTokenClient({
        client_id: CREDENTIALS.GOOGLE_IDENTITY_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/books email profile',
        callback: (response: { access_token: string }) => {
          this.authService.setAuthToken(response.access_token);
          this.navigateToBooksOverview();
        },
      });
    }
  }

  private navigateToBooksOverview(): void {
    this.router.navigate([APP_ROUTES.BOOKS_OVERVIEW]);
  }
}

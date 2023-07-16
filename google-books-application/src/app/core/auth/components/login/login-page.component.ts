import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CREDENTIALS } from '../../../../../app/credentials/credentials.conts';
import { APP_ROUTES } from '../../../../shared/constants/app-routes.const';
import { GOOGLE_AUTH_SCOPE } from '../../constants/google-auth-scope.const';

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
  private googleApiAccountsRef: any;

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit(): void {
    if (this.authService.getAuthToken()) {
      this.navigateToBooksOverview();
    } else {
      this.googleApiAccountsRef = google.accounts.oauth2.initTokenClient({
        client_id: CREDENTIALS.GOOGLE_IDENTITY_CLIENT_ID,
        scope: GOOGLE_AUTH_SCOPE,
        callback: (response: { access_token: string }) => {
          this.authService.setAuthToken(response.access_token);
          this.navigateToBooksOverview();
        },
      });
    }
  }

  protected requestAccessToken(): void {
    this.googleApiAccountsRef.requestAccessToken();
  }

  private navigateToBooksOverview(): void {
    this.router.navigate([APP_ROUTES.SEARCH]);
  }
}

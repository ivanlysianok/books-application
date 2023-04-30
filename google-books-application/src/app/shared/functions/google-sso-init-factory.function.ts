import { NgZone } from '@angular/core';
import { CredentialResponse, accounts } from 'google-one-tap';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { CREDENTIALS } from 'src/app/credentials/credentials.conts';

/**
 * Google auth variable
 */
declare var google: { accounts: accounts };

/**
 * Google Single sign-on authentication factory
 * @param ngZone Instance of NgZone
 * @param authService Instance of AuthService
 */
export function googleSSOInitFactory(
  ngZone: NgZone,
  authService: AuthService
): void {
  google.accounts.id.initialize({
    client_id: CREDENTIALS.GOOGLE_IDENTITY_CLIENT_ID,
    callback: (data: CredentialResponse) => {
      ngZone.run(() => {
        authService.encodeJWTAndGetUserData(data.credential);
      });
    },
    cancel_on_tap_outside: true,
  });
}

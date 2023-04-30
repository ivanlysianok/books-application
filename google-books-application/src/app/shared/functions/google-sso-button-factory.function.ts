import { ElementRef } from '@angular/core';
import { accounts } from 'google-one-tap';

/**
 * Google auth variable
 */
declare var google: { accounts: accounts };

/**
 * Google Sign-on button factory
 * @param buttonRef Sign-on button reference
 */
export function googleSSOButtonFactory(buttonRef: ElementRef): void {
  google.accounts.id.renderButton(buttonRef.nativeElement, {
    theme: 'filled_black',
    size: 'large',
    locale: 'en-EN',
    shape: 'rectangular',
    width: 250,
  });
}

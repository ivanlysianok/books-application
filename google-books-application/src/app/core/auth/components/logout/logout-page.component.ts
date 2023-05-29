import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../../shared/constants/app-routes.const';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
})
export class LogoutPageComponent {
  constructor(private router: Router) {}

  protected navigateToLoginPage(): void {
    this.router.navigate([APP_ROUTES.LOGIN]);
  }
}

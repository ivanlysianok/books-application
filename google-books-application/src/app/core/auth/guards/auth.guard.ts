import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { APP_ROUTES } from 'src/app/shared/constants/app-routes.const';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivate(): boolean {
    if (!this.authService.isUserAuth()) {
      this.router.navigate([APP_ROUTES.LOGIN]);
      return false;
    }
    return true;
  }
}

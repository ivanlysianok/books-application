import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { AuthUserData } from '../models/auth-user-data.interface';
import { Router } from '@angular/router';
import { APP_ROUTES } from 'src/app/shared/constants/app-routes.const';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  public isUserAuth(): boolean {
    return !!localStorage.getItem('authUserID');
  }

  public encodeJWTAndGetUserData(token: string): void {
    const userData: AuthUserData = jwt_decode<AuthUserData>(token);
    if (userData) {
      localStorage.setItem('authUserID', userData.sub);
      this.router.navigate([APP_ROUTES.BOOKS_OVERVIEW]);
    }
  }
}

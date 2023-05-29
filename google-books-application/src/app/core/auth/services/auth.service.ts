import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AUTH_TOKEN_DEFINITION } from '../constants/auth-token-definition.const';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpService: HttpClient) {}

  /**
   * Get auth token from LocalStorage to check if user is authenticated within Google or not
   * @returns Auth token if presented, otherwise null
   */
  public getAuthToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_DEFINITION);
  }

  /**
   * Set auth token to LocalStorage
   * @param accessToken Access token from Google oAuth API
   */
  public setAuthToken(accessToken: string): void {
    localStorage.setItem(AUTH_TOKEN_DEFINITION, accessToken);
  }

  /**
   * Reset auth token from LocalStorage to logout authenticated user
   */
  public resetAuthToken(): void {
    localStorage.removeItem(AUTH_TOKEN_DEFINITION);
  }

  /**
   * Get active user data from Google by access token
   * @param accessToken Access token
   * @returns Observable with user data
   */
  public getActiveUserDataByToken(): Observable<any> {
    return this.httpService.get<any>(`${environment.apiUrl}oauth2/v1/userinfo`);
  }
}

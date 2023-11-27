import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AUTH_TOKEN_DEFINITION } from '../constants/auth-token-definition.const';
import { environment } from 'src/environments/environment';
import { UserProfile } from '../interfaces/user-profile.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * @description Subject for save authentication token
   */
  private authTokenSub$ = new BehaviorSubject<string | null>(null);
  /**
   * @description Data source for get authentication token
   */
  public authTokenChanges$ = this.authTokenSub$.asObservable();

  constructor(private httpService: HttpClient) {}

  /**
   * @description Get auth token from LocalStorage to check if user is authenticated within Google or not
   * @returns Auth token if presented, otherwise null
   */
  public getAuthToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_DEFINITION);
  }

  /**
   * @description Set auth token to LocalStorage and to authToken subject
   * @param accessToken Access token from Google oAuth API
   */
  public setAuthToken(accessToken: string): void {
    localStorage.setItem(AUTH_TOKEN_DEFINITION, accessToken);
    this.authTokenSub$.next(accessToken);
  }

  /**
   * @description Reset auth token from LocalStorage and from authToken subject
   */
  public resetAuthToken(): void {
    localStorage.removeItem(AUTH_TOKEN_DEFINITION);
    this.authTokenSub$.next(null);
  }

  /**
   * @description Get active user data from Google by access token
   * @param accessToken Access token
   * @returns Observable with user data
   */
  public getUserProfile(): Observable<UserProfile> {
    return this.httpService.get<UserProfile>(
      `${environment.apiUrl}oauth2/v1/userinfo`
    );
  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { googleSSOButtonFactory } from 'src/app/shared/functions/google-sso-button-factory.function';
import { APP_ROUTES } from 'src/app/shared/constants/app-routes.const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, AfterViewInit {
  @ViewChild('signInButton') private googleSignInButtonRef: ElementRef | null =
    null;

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit(): void {
    if (!this.authService.isUserAuth()) {
      return;
    }
    this.router.navigate([APP_ROUTES.BOOKS_OVERVIEW]);
  }

  public ngAfterViewInit(): void {
    if (!this.googleSignInButtonRef) {
      return;
    }
    googleSSOButtonFactory(this.googleSignInButtonRef);
  }
}

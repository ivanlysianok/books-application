import { APP_INITIALIZER, NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BooksModule } from './modules/books/books.module';
import { RouterModule } from '@angular/router';
import { AuthModule } from './core/auth/auth.module';
import { googleSSOInitFactory } from './shared/functions/google-sso-init-factory.function';
import { AuthService } from './core/auth/services/auth.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    AuthModule,
    BooksModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: googleSSOInitFactory,
      deps: [NgZone, AuthService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

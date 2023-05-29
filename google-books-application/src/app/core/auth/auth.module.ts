import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './components/login/login-page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [AuthRoutingModule],
  exports: [LoginPageComponent],
})
export class AuthModule {}

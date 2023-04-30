import { NgModule } from '@angular/core';
import { LoginPageComponent } from './components/login-page.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [AuthRoutingModule],
})
export class AuthModule {}

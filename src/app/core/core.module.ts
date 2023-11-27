import { NgModule } from '@angular/core';
import { LoginPageComponent } from './auth/components/login/login-page.component';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/components/header.component';
import { SharedModule } from '../shared/shared.module';
import { LogoutPageComponent } from './auth/components/logout/logout-page.component';

@NgModule({
  declarations: [LoginPageComponent, LogoutPageComponent, HeaderComponent],
  imports: [CoreRoutingModule, SharedModule],
  exports: [HeaderComponent],
})
export class CoreModule {}

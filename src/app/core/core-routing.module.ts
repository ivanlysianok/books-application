import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutPageComponent } from './auth/components/logout/logout-page.component';
import { LoginPageComponent } from './auth/components/login/login-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'logout',
    component: LogoutPageComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}

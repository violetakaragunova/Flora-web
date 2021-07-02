import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../guards/admin.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: LogInComponent,
    data: { title: 'anms.account' }
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
    data: { title: 'anms.forgotPassword' }
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    data: { title: 'anms.resetPassword' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { LogInComponent } from './log-in/log-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    LogInComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RegisterComponent
  ],
  imports: [CommonModule, AccountRoutingModule, SharedModule],
  exports: [RegisterComponent]
})
export class AccountModule {}

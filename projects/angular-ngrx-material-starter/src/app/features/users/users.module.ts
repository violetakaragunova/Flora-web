import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersItemComponent } from './users-item/users-item.component';
import { UsersListComponent } from './users-list/users-list.component';
import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from '../account/register/register.component';
import { AccountModule } from '../account/account.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [
    UsersItemComponent, 
    UsersListComponent, 
    UserProfileComponent],
  imports: [
    CommonModule, 
    UsersRoutingModule,
    AvatarModule,
    SharedModule, 
    AccountModule]
})
export class UsersModule {}

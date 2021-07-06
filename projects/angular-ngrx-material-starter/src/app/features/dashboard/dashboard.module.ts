import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { DashboardItemComponent } from './dashboard-item/dashboard-item.component';
import { NeedItemComponent } from './need-item/need-item.component';

@NgModule({
  declarations: [DashboardComponent, DashboardItemComponent, NeedItemComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule]
})
export class DashboardModule {}

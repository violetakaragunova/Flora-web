import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantsRoutingModule } from './plants-routing.module';
import { ListPlantsComponent } from './list-plants/list-plants.component';

@NgModule({
  declarations: [ListPlantsComponent],
  imports: [CommonModule, PlantsRoutingModule]
})
export class PlantsModule {}

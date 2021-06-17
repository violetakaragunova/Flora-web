import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantsRoutingModule } from './plants-routing.module';
import { ListPlantsComponent } from './list-plants/list-plants.component';
import { PlantAddComponent } from './plant-add/plant-add.component';
import { PlantItemComponent } from './plant-item/plant-item.component';
import { PlantDetailsComponent } from './plant-details/plant-details.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ListPlantsComponent,
    PlantAddComponent,
    PlantItemComponent,
    PlantDetailsComponent
  ],
  imports: [CommonModule, PlantsRoutingModule, SharedModule]
})
export class PlantsModule {}

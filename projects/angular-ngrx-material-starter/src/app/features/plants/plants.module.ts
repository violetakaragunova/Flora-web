import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantsRoutingModule } from './plants-routing.module';
import { ListPlantsComponent } from './list-plants/list-plants.component';
import { PlantAddComponent } from './plant-add/plant-add.component';
import { PlantItemComponent } from './plant-item/plant-item.component';
import { PlantDetailsComponent } from './plant-details/plant-details.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { PlantNeedComponent } from './plant-need/plant-need.component';
import { PlantNeedAddComponent } from './plant-need-add/plant-need-add.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
@NgModule({
  declarations: [
    ListPlantsComponent,
    PlantAddComponent,
    PlantItemComponent,
    PlantDetailsComponent,
    PlantNeedComponent,
    PlantNeedAddComponent,
    UploadImageComponent
  ],
  imports: [CommonModule, PlantsRoutingModule, SharedModule, NgxGalleryModule]
})
export class PlantsModule {}

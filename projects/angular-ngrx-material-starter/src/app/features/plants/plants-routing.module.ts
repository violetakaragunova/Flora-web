import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../guards/admin.guard';
import { ListPlantsComponent } from './list-plants/list-plants.component';
import { PlantAddComponent } from './plant-add/plant-add.component';

const routes: Routes = [
  {
    path: '',
    component: ListPlantsComponent,
    canActivate: [AdminGuard],
    data: { title: 'anms.plants.list' }
  },
  {
    path: 'add',
    component: PlantAddComponent,
    canActivate: [AdminGuard],
    data: { title: 'anms.plants.add' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantsRoutingModule {}

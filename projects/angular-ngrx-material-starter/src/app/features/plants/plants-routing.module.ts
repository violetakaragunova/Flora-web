import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { ListPlantsComponent } from './list-plants/list-plants.component';

const routes: Routes = [
  {
    path: '',
    component: ListPlantsComponent,
    canActivate: [AuthGuard],
    data: { title: 'flora.plants.list' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantsRoutingModule {}

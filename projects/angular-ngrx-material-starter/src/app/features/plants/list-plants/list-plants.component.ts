import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Plant } from '../../../models/plant';
import { PlantService } from '../plant.service';

@Component({
  selector: 'anms-list-plants',
  templateUrl: './list-plants.component.html',
  styleUrls: ['./list-plants.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPlantsComponent implements OnInit {
  plants: BehaviorSubject<Plant[]> = new BehaviorSubject<Plant[]>(null);
  events: string[] = [];
  opened: boolean;
  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.plantService.getPlants().subscribe((data: Plant[]) => {
      this.plants.next(data);
    });
  }

  onSelectedPlant(plant) {
    this.plantService.currentSelectedPlant.next(plant);
  }

  deletePlant(){
    this.plantService.currentSelectedPlant.next(null);
  }
}

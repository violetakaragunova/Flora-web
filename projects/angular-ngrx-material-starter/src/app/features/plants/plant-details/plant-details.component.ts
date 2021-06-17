import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plant } from '../../../models/plant';
import { PlantService } from '../plant.service';

@Component({
  selector: 'anms-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlantDetailsComponent implements OnInit {
  plant: Plant;
  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.plantService.currentSelectedPlant.subscribe((result) => {
      this.plant = result;
      this.changeDetectorRef.detectChanges();
    });
  }
}

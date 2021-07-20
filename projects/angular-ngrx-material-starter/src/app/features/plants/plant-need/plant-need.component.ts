import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Plant } from '../../../models/plant';
import { PlantNeed } from '../../../models/plantNeed';
import { NeedService } from '../need.service';
import { PlantService } from '../plant.service';

@Component({
  selector: 'flora-plant-need',
  templateUrl: './plant-need.component.html',
  styleUrls: ['./plant-need.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlantNeedComponent implements OnInit {
  @Input() plant: Plant;
  @Output() onSave: EventEmitter<string> = new EventEmitter<string>();
  plantOb: BehaviorSubject<Plant> = new BehaviorSubject<Plant>(null);
  types = { 1: 'Daily', 2: 'Weekly', 3: 'Monthly' };
  displayedColumns: string[] = [
    'needId',
    'monthFrom',
    'monthTo',
    'quantity',
    'frequency',
    'type',
    'settings'
  ];
  need: string;
  plantNeed: PlantNeed;
  addNeed: boolean = false;
  constructor(
    private toastr: ToastrService,
    private needService: NeedService,
    private plantService: PlantService
  ) {}

  ngOnInit(): void {
    this.plantOb.next(this.plant);
  }

  deleteNeed() {
    this.needService.deletePlantNeed(this.plantNeed.id).subscribe(
      (response) => {
        this.onSave.emit();
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  setNeed(need: PlantNeed) {
    this.plantNeed = need;
  }

  openAddNeed(isAdd: boolean) {
    this.addNeed = true;
    if (isAdd) {
      this.plantNeed = null;
    }
  }

  closeAddNeed() {
    this.addNeed = false;
  }

  reloadPlants() {
    this.plantService
      .getPlantById(this.plant.id)
      .subscribe((response: Plant) => {
        this.plantOb.next(response);
        console.log(response);
        console.log(this.plantOb.value);
        console.log(this.plant);
      });
    this.addNeed = false;
    this.onSave.emit();
  }
}

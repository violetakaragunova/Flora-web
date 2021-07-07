import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    private needService: NeedService
  ) {}

  ngOnInit(): void {}

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
}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
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
  months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  };
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
    private plantService: PlantService,
    private toastr: ToastrService,
    private needService: NeedService
  ) {}

  ngOnInit(): void {}

  getNeed(id: number): string {
    this.needService.getNeed(id).subscribe((response: string) => {
      this.need = response;
    });
    return this.need;
  }

  deleteNeed() {
    this.needService.deletePlantNeed(this.plantNeed.id).subscribe(
      (response) => {
        window.location.reload();
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

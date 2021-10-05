import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Action } from '../../../models/action';
import { DashboardPlant } from '../../../models/dashboardPlant';
import { FrequencyType } from '../../../models/frequencyType';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'anms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  types$: BehaviorSubject<FrequencyType[]> = new BehaviorSubject<
    FrequencyType[]
  >(null);
  plants$: BehaviorSubject<DashboardPlant[]> = new BehaviorSubject<
    DashboardPlant[]
  >(null);
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
  displayedColumns: string[] = [
    'needId',
    'monthFrom',
    'monthTo',
    'quantity',
    'frequency',
    'type'
  ];
  selectedType: number = 1;

  model: Action;
  actionNeed: boolean = false;

  constructor(
    private dashboardService: DashboardService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dashboardService.getTypes().subscribe((data: FrequencyType[]) => {
      this.types$.next(data);
    });
    this.dashboardService
      .getPlants(this.selectedType)
      .subscribe((data: DashboardPlant[]) => {
        this.plants$.next(data);
      });
  }

  apply() {
    console.log(this.selectedType);
    this.dashboardService
      .getPlants(this.selectedType)
      .subscribe((data: DashboardPlant[]) => {
        this.plants$.next(data);
      });
    this.changeDetectorRef.detectChanges();
  }
}

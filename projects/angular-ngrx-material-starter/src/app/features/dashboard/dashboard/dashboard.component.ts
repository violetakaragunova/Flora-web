import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { repeat, take } from 'rxjs/operators';
import { Action } from '../../../models/action';
import { FrequencyType } from '../../../models/frequencyType';
import { Month } from '../../../models/month';
import { Need } from '../../../models/need';
import { Plant } from '../../../models/plant';
import { PlantNeed } from '../../../models/plantNeed';
import { User } from '../../../models/user';
import { AccountService } from '../../account/account.service';
import { MonthService } from '../../plants/month.service';
import { PlantService } from '../../plants/plant.service';
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
  plants$: BehaviorSubject<Plant[]> = new BehaviorSubject<Plant[]>(null);
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
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private plantService: PlantService
  ) {
    
  }

  ngOnInit(): void {
    this.dashboardService.getTypes().subscribe((data: FrequencyType[]) => {
      this.types$.next(data);
    });
    this.plantService.getPlants().subscribe((data: Plant[]) => {
      this.plants$.next(data);
    });
  }

  apply() {
    console.log(this.selectedType);
    /*this.dashboardService.getPlants().subscribe((data: Plant[]) => {
      this.plants$.next(data);
    });
    console.log(this.dashboardService.needAction(1,1,1));*/
    this.changeDetectorRef.detectChanges();
  }

  needAction(need: PlantNeed) {
    var action = true;
    this.dashboardService
      .needAction(need.needId, need.plantId, 1)
      .subscribe((response) => {
        console.log(response);
        action = response;
      });
    return action;
  }
}

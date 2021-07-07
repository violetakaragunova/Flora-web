import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { repeat, take } from 'rxjs/operators';
import { Action } from '../../../models/action';
import { DashboardPlant } from '../../../models/dashboardPlant';
import { DashboardPlantNeed } from '../../../models/dashboardPlantNeed';
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
  selector: 'flora-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  types$: BehaviorSubject<FrequencyType[]> = new BehaviorSubject<FrequencyType[]>(null);
  plants$: BehaviorSubject<DashboardPlant[]> = new BehaviorSubject<DashboardPlant[]>(null);
  displayedColumns: string[] = ['needId', 'monthFrom', 'monthTo', 'quantity', 'frequency', 'type'];
  selectedType: number;
  user: any;
  curDate: any;
  model: Action;
  addAction: FormGroup;
  actionNeed: boolean = false;

  constructor(
    private dashboardService: DashboardService,
      private changeDetectorRef: ChangeDetectorRef,
      private router: Router,
      private accountService: AccountService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService,
      private plantService: PlantService) {
        this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
          this.user = user;
        });
        this.addAction = this.formBuilder.group({
          userId: [null, Validators.required],
          plantId: [null, Validators.required],
          needId: [null, Validators.required],
          dateActionDone : [null, Validators.required]
        });
      }

  ngOnInit(): void {
    this.dashboardService.getTypes().subscribe((data: FrequencyType[]) => {
      this.types$.next(data);
    });
    this.selectedType = 1;
    this.dashboardService.getPlants(this.selectedType).subscribe((data: DashboardPlant[]) => {
      this.plants$.next(data);
    });
  }

  onTypeSelectionChanged() {
    this.dashboardService.getPlants(this.selectedType).subscribe((data: DashboardPlant[]) => {
      this.plants$.next(data);
    });
  }

  actionDone(plant: DashboardPlant , need: DashboardPlantNeed){
    this.curDate=new Date();
    this.addAction.value['userId']=this.user.id;
    this.addAction.value['plantId']=plant.plantId;
    this.addAction.value['needId']=need.needId;
    this.addAction.value['dateActionDone']=this.curDate;
    this.dashboardService.addPlant(this.addAction.value).subscribe(
      (response) => {
        this.toastr.success(need.needName+" done!");
        this.dashboardService.getPlants(this.selectedType).subscribe((data: DashboardPlant[]) => {
          this.plants$.next(data);
        });
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

}

import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
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
  selector: 'anms-need-item',
  templateUrl: './need-item.component.html',
  styleUrls: ['./need-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeedItemComponent implements OnInit {
  @Input() need: PlantNeed

  AddAction: FormGroup;
  curDate: any;
  user: any;
  done = false
  constructor(
    private dashboardService: DashboardService,
      private changeDetectorRef: ChangeDetectorRef,
      private router: Router,
      private accountService: AccountService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService,
      private plantService: PlantService) {
        this.AddAction = this.formBuilder.group({
          userId: [null, Validators.required],
          plantId: [null, Validators.required],
          needId: [null, Validators.required],
          dateActionDone : [null, Validators.required]
        });
      }

  ngOnInit(): void {
    console.log(this.need);
  this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
    this.user = user;
  });
  }

  actionDone(need: PlantNeed){
    this.done = true

    this.curDate=new Date();
    this.AddAction.value['id']=need.id;
    this.AddAction.value['userId']=this.user.id;
    this.AddAction.value['plantId']=need.plantId;
    this.AddAction.value['needId']=need.needId;
    this.AddAction.value['dateActionDone']=this.curDate;
    this.dashboardService.addAction(this.AddAction.value).subscribe(
      (response) => {
        this.toastr.success(need.needName+" done!");
        this.done = true
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}

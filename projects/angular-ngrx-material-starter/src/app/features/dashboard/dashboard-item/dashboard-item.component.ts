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
  selector: 'anms-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardItemComponent implements OnInit {
  @Input() plant: Plant

  constructor(
    private dashboardService: DashboardService,
      private changeDetectorRef: ChangeDetectorRef,
      private router: Router,
      private accountService: AccountService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService,
      private plantService: PlantService) {
        
      }

  ngOnInit(): void {
  
    
  }


}

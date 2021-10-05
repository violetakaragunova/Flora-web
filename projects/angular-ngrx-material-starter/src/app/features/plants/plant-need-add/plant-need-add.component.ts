import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FrequencyType } from '../../../models/frequencyType';
import { Month } from '../../../models/month';
import { Need } from '../../../models/need';
import { PlantNeed } from '../../../models/plantNeed';
import { DashboardService } from '../../dashboard/dashboard.service';
import { MonthService } from '../month.service';
import { NeedService } from '../need.service';

@Component({
  selector: 'flora-plant-need-add',
  templateUrl: './plant-need-add.component.html',
  styleUrls: ['./plant-need-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlantNeedAddComponent implements OnInit {
  @Input() plantNeed: PlantNeed;
  @Input() plantId: number;
  @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onAdd: EventEmitter<PlantNeed> = new EventEmitter<PlantNeed>();
  AddForm: FormGroup;
  displayedColumns: string[] = [
    'needId',
    'monthFrom',
    'monthTo',
    'quantity',
    'frequency',
    'type'
  ];
  isAdd: boolean = true;
  needs$: BehaviorSubject<Need[]> = new BehaviorSubject<Need[]>(null);
  types$: BehaviorSubject<FrequencyType[]> = new BehaviorSubject<
    FrequencyType[]
  >(null);
  months$: BehaviorSubject<Month[]> = new BehaviorSubject<Month[]>(null);
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private needService: NeedService,
    private monthService: MonthService,
    private dashboardService: DashboardService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.AddForm = this.formBuilder.group({
      id: [0],
      monthFromId: [null, Validators.required],
      monthToId: [null, Validators.required],
      quantity: ['', Validators.required],
      frequency: ['', Validators.required],
      frequencyTypeId: [null, Validators.required],
      needId: [null, Validators.required],
      plantId: [this.plantId, Validators.required]
    });

    if (this.plantNeed) {
      this.AddForm.patchValue(this.plantNeed);
      this.isAdd = false;
    }

    this.needService.getNeeds().subscribe((data: Need[]) => {
      this.needs$.next(data);
    });

    this.dashboardService.getTypes().subscribe((data: FrequencyType[]) => {
      this.types$.next(data);
    });

    this.monthService.getMonths().subscribe((data: Month[]) => {
      this.months$.next(data);
    });
  }

  get getFormControls() {
    return this.AddForm.controls;
  }

  onSaveTypeClicked() {
    this.AddForm.value['needId'] = parseInt(this.AddForm.value['needId']);
    this.AddForm.value['monthFromId'] = parseInt(
      this.AddForm.value['monthFromId']
    );
    this.AddForm.value['monthToId'] = parseInt(this.AddForm.value['monthToId']);
    this.AddForm.value['quantity'] = parseInt(this.AddForm.value['quantity']);
    this.AddForm.value['frequency'] = parseInt(this.AddForm.value['frequency']);
    if (this.isAdd) {
      this.needService.addNeed(this.AddForm.value).subscribe(
        (response) => {
          this.AddForm.reset();
          this.onSave.emit(true);
        },
        (error) => {
          this.toastr.error('There was some issue. The need was not added.');
        }
      );
    } else {
      this.AddForm.value['id'] = this.plantNeed.id;
      this.needService.updatePlantNeed(this.AddForm.value).subscribe(
        (response) => {
          this.AddForm.reset();
          this.needService.getNeeds().subscribe((data: Need[]) => {
            this.needs$.next(data);
          });
          this.changeDetectorRef.detectChanges();
        },
        (error) => {
          this.toastr.error('There was some issue. The need was not updated.');
        }
      );
    }
  }
}

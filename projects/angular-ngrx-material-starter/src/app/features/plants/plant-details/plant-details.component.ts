import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Plant } from '../../../models/plant';
import { PlantService } from '../plant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlantNeed } from '../../../models/plantNeed';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../../../models/room';
import { RoomService } from '../room.service';

@Component({
  selector: 'flora-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlantDetailsComponent implements OnInit {
  @Output() onSave: EventEmitter<string> = new EventEmitter<string>();
  AddForm: FormGroup;
  isAddMode: boolean;
  plant: Plant;
  events: string[] = [];
  opened: boolean;
  addNeed: boolean = false;
  convertedImage: string = '';
  rooms$: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>(null);

  constructor(
    private formBuilder: FormBuilder,
    private plantService: PlantService,
    private changeDetectorRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.AddForm = this.formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      roomId: [null, Validators.required],
      description: ['', Validators.required],
      url: ['']
    });

    this.plantService.currentSelectedPlant.subscribe((result) => {
      this.plant = result;
      this.isAddMode = false;
      if (this.plant == null) {
        this.AddForm.reset();
        this.isAddMode = true;
      }
      this.AddForm.patchValue(this.plant);
    });

    this.roomService.getRooms().subscribe((data: Room[]) => {
      this.rooms$.next(data);
    });
  }

  get f() {
    return this.AddForm.controls;
  }

  openAddNeed() {
    this.addNeed = true;
  }
  closeAddNeed() {
    this.addNeed = false;
  }

  save() {
    if (this.isAddMode) {
      this.AddForm.value['url'] = this.convertedImage;
      this.plantService.addPlant(this.AddForm.value).subscribe(
        (response) => {
          this.toastr.success('Plant was added successfuly');
          this.onSave.emit();
        },
        (error) => {
          this.toastr.error(error);
          this.onSave.emit();
        }
      );
    } else {
      this.AddForm.value['roomId'] = Number(this.AddForm.value['roomId']);
      this.AddForm.value['id'] = this.plant.id;
      this.AddForm.value['url'] = this.plant.photoUrl;
      console.log(this.AddForm.value);
      this.plantService.updatePlant(this.AddForm.value).subscribe(
        (response) => {
          this.toastr.success('Plant was updated successfuly');
          this.onSave.emit();
        },
        (error) => {
          this.toastr.error(error);
        }
      );
    }
  }

  deletePlant() {
    this.plantService.deletePlant(this.plant.id).subscribe(
      (response) => {
        this.toastr.success('Plant was deleted successfuly');
        this.onSave.emit();
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }

  parentEventHandlerFunction(valueEmitted) {
    this.convertedImage = valueEmitted;
  }

  reloadPlants() {
    this.plantService.currentSelectedPlant.subscribe((result) => {
      this.plant = result;
      this.isAddMode = false;
      if (this.plant == null) {
        this.AddForm.reset();
        this.isAddMode = true;
      }
      this.AddForm.patchValue(this.plant);
    });
    this.changeDetectorRef.detectChanges();
  }
}

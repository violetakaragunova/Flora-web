import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Plant } from '../../../models/plant';
import { PlantService } from '../plant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlantNeed } from '../../../models/plantNeed';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'anms-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlantDetailsComponent implements OnInit{
  AddForm: FormGroup;
  isAddMode: boolean;
  plant: Plant;
  events: string[] = [];
  opened: boolean;
  needs: PlantNeed[];
  addNeed: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private plantService: PlantService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.AddForm = this.formBuilder.group({
      id:[0],
      name: ['', Validators.required],
      roomId: [null, Validators.required],
      description:['',Validators.required]
    });

    this.plantService.currentSelectedPlant.subscribe((result) => {
      this.plant = result;
      this.needs=this.plant?.plantNeeds;
      this.isAddMode=false;
      if(this.plant == null)
       {
        this.AddForm.reset();
        this.isAddMode=true;
       } 
       console.log(this.plant);
      this.changeDetectorRef.detectChanges();
      this.AddForm.patchValue(this.plant);
    });

    console.log(this.AddForm.value);
  }

  get f() { return this.AddForm.controls; }

  openAddNeed(){
    this.addNeed=true;
  }
  closeAddNeed(){
    this.addNeed=false;
  }

  save(){
    this.AddForm.value['roomId'] = parseInt(this.AddForm.value['roomId']);
    if(this.isAddMode){
      this.plantService.addPlant(this.AddForm.value).subscribe(
        (response) => {
         window.location.reload();
        },
        (error) => {
          this.toastr.error(error);
        }
      );
    }
    else{
      this.AddForm.value['id']=this.plant.id;
      this.plantService.updatePlant(this.AddForm.value).subscribe(
        (response) => {
         window.location.reload();
        },
        (error) => {
          this.toastr.error(error);
        }
      );
    }
  }

  deletePlant(){
    this.plantService.deletePlant(this.plant.id).subscribe(
      (response) => {
        window.location.reload();
      }, (error) => {
        this.toastr.error(error);
      }
    )
  }

}

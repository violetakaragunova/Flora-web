import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlantService } from '../plant.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'flora-plant-add',
  templateUrl: './plant-add.component.html',
  styleUrls: ['./plant-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlantAddComponent implements OnInit {
  AddForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private plantService: PlantService,
    private toastr: ToastrService
  ) {
    this.AddForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      roomId: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.AddForm.controls;
  }

  addPlant() {
    this.submitted = true;
    if (this.AddForm.invalid) {
      return;
    }
    this.AddForm.value['roomId'] = parseInt(this.AddForm.value['roomId']);
    this.plantService.addPlant(this.AddForm.value).subscribe(
      (response) => {
        this.router.navigateByUrl('/plants');
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
}

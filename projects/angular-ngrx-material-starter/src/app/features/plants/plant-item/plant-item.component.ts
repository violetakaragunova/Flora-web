import { ChangeDetectorRef } from '@angular/core';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'anms-plant-item',
  templateUrl: './plant-item.component.html',
  styleUrls: ['./plant-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlantItemComponent implements OnInit {
  @Input() plant;

  constructor() {}

  ngOnInit(): void {}
}

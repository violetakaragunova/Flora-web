import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { DashboardPlant } from '../../../models/dashboardPlant';

@Component({
  selector: 'anms-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardItemComponent implements OnInit {
  @Input() plant: DashboardPlant;

  constructor() {}

  ngOnInit(): void {
  }
}

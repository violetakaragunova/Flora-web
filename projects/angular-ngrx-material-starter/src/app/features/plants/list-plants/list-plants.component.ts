import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-list-plants',
  templateUrl: './list-plants.component.html',
  styleUrls: ['./list-plants.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPlantsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

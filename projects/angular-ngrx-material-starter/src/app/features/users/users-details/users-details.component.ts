import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

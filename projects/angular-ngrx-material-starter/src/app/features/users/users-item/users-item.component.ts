import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

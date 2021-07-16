import { Input } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'flora-users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersItemComponent implements OnInit {
  @Input() user;
  constructor() {}

  ngOnInit(): void {}
}

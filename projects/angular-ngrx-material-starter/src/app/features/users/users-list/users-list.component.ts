import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'flora-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {
  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
  events: string[] = [];
  opened: boolean;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users$.next(data);
    });
  }

  reloadUsers() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users$.next(data);
    });
  }
}

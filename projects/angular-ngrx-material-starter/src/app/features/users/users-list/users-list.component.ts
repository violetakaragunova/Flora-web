import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'anms-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {
  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);
  constructor(
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users$.next(data);
      console.log(this.users$);
    });
  }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../../../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'flora-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  user: any;
  id: number;
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(this.id).subscribe((data: User) => {
      this.user$.next(data);
      this.user=data;
    });
    
  }

}

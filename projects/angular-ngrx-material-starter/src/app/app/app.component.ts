import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectEffectiveTheme } from '../core/core.module';
import { AccountService } from '../features/account/account.service';
import { User } from '../models/user';

@Component({
  selector: 'anms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  logo = require('../../assets/logoPlantTracker.png').default;
  theme$: Observable<string>;
  user:User;

  constructor(
    private store: Store,
    public accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
      this.user=user;
    }
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/account');
  }
}

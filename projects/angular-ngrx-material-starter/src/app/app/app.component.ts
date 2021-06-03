import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
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

  constructor(private store: Store, public accountService: AccountService) {}

  ngOnInit(): void {
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
    console.log(this.accountService.currentUser$);
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
    }
  }

  logout() {
    this.accountService.logout();
    window.location.reload();
  }
}

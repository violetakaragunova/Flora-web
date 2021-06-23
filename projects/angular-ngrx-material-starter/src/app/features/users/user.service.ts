import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { User } from '../../models/user';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  ApiUrl = 'https://localhost:44366/api/';
  user: User;

  constructor(
    private accountService: AccountService,
    private http: HttpClient
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
  }

  getUsers() {
    return this.http.get(this.ApiUrl + 'user').pipe(
      map((data: User[]) => {
        return data;
      })
    );
  }
}

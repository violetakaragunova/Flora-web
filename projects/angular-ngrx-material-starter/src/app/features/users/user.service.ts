import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  ApiUrl = environment.apiUrl;
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

  getUser(id: number) {
    return this.http.get(this.ApiUrl + 'user/'+id).pipe(
      map((data: User) => {
        return data;
      })
    );
  }
}

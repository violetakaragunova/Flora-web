import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Plant } from '../../models/plant';
import { User } from '../../models/user';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  ApiUrl = 'https://localhost:44366/api/';
  user: User;
  plants: Plant[];
  currentSelectedPlant: BehaviorSubject<Plant> = new BehaviorSubject<Plant>(
    null
  );

  constructor(
    private accountService: AccountService,
    private http: HttpClient
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }

  getPlants() {
    return this.http.get(this.ApiUrl + 'plant').pipe(
      map((data: Plant[]) => {
        return data;
      })
    );
  }

  getPlantById(id: number) {
    return this.http.get(this.ApiUrl + 'plant/' + id).pipe(
      map((response: Plant) => {
        return response;
      })
    );
  }

  addPlant(model: any) {
    return this.http.post(this.ApiUrl + 'plant/add', model).pipe(
      map((response: Plant) => {
        console.log(response);
      })
    );
  }
}

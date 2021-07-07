import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Plant } from '../../models/plant';
import { PlantNeed } from '../../models/plantNeed';
import { User } from '../../models/user';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class NeedService {
  user: User;
  currentSelectedPlant: BehaviorSubject<Plant> = new BehaviorSubject<Plant>(
    null
  );

  constructor(
    private accountService: AccountService,
    private http: HttpClient
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
  }

  getNeeds() {
    return this.http.get(environment.apiUrl + 'need').pipe(data => {
      return data;
    });
  }

  updatePlantNeed(model: PlantNeed) {
    return this.http.post(environment.apiUrl + 'need/update', model).pipe(response => {
      return response;
    });
  }

  addNeed(model: PlantNeed) {
    return this.http.post(environment.apiUrl + 'need/add', model).pipe(response => {
      return response;
    });
  }

  deletePlantNeed(id: number) {
    return this.http.delete(environment.apiUrl + 'need/' + id);
  }
}

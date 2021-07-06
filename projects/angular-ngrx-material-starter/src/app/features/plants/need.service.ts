import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Need } from '../../models/need';
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
    return this.http.get(environment.apiUrl + 'need').pipe(
      map((data: Need[]) => {
        return data;
      })
    );
  }

  updatePlantNeed(model: PlantNeed) {
    return this.http.post(environment.apiUrl + 'need/update', model).pipe(
      map((response: PlantNeed) => {
        return response;
      })
    );
  }
  getNeed(id: number) {
    return this.http
      .get(environment.apiUrl + 'need/' + id, { responseType: 'text' })
      .pipe(
        map((response: string) => {
          return response;
        })
      );
  }

  addNeed(model: PlantNeed) {
    return this.http.post(environment.apiUrl + 'need/add', model).pipe(
      map((response: PlantNeed) => {
        return response;
      })
    );
  }

  deletePlantNeed(id: number) {
    return this.http.delete(environment.apiUrl + 'need/' + id);
  }
}

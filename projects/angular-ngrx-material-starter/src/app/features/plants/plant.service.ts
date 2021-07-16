import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Plant } from '../../models/plant';
import { User } from '../../models/user';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
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
    });
  }

  getPlants() {
    return this.http.get(environment.apiUrl + 'plant').pipe(data => {
      return data;
    });
  }

  getPlantById(id: number) {
    return this.http.get(environment.apiUrl + 'plant/' + id).pipe(response => {
      return response;
    });
  }

  addPlant(model: any) {
    model.id = 0;
    return this.http.post(environment.apiUrl + 'plant/add', model).pipe(response => {
      return response;
    });
  }

  deletePlant(id: number) {
    return this.http.delete(environment.apiUrl + 'plant/' + id);
  }

  updatePlant(model: Plant) {
    return this.http.post(environment.apiUrl + 'plant/update', model).pipe(response => {
      return response;
    });
  }
}

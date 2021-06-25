import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Plant } from '../../models/plant';
import { PlantNeed } from '../../models/plantNeed';
import { User } from '../../models/user';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  ApiUrl = environment.apiUrl;
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
    model.id = 0;
    return this.http.post(this.ApiUrl + 'plant/add', model).pipe(
      map((response: Plant) => {
        return response;
      })
    );
  }

  deletePlant(id: number) {
    return this.http.delete(this.ApiUrl + 'plant/' + id);
  }

  updatePlant(model: any) {
    return this.http.post(this.ApiUrl + 'plant/update', model).pipe(
      map((response: Plant) => {
        return response;
      })
    );
  }
}

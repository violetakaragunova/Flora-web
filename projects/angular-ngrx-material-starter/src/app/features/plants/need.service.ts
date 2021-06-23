import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Need } from '../../models/need';
import { Plant } from '../../models/plant';
import { PlantNeed } from '../../models/plantNeed';
import { User } from '../../models/user';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class NeedService {
  ApiUrl = 'https://localhost:44366/api/';
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
      console.log(user);
    });
  }

  getNeeds(){
    return this.http.get(this.ApiUrl + 'need').pipe(
      map((data: Need[]) => {
        return data;
      })
    );
  }

  updatePlantNeed(model:any){
    return this.http.post(this.ApiUrl+"need/update",model).pipe(
      map((response: PlantNeed) => {
        return response;
      })
    )
  }
  getNeed(id: number){
    return this.http.get(this.ApiUrl+'need/'+id,{responseType: 'text'}).pipe(
      map((response: string) => {
        return response;
      })
    )
  }

  addNeed(model: any){
    return this.http.post(this.ApiUrl+"need/add",model).pipe(
      map((response: PlantNeed) => {
        return response;
      })
    )
  }

  deletePlantNeed(id: number) {
    return this.http.delete(this.ApiUrl+'need/'+id);
  }
}

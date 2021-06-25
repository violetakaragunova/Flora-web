import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Action } from '../../models/action';
import { FrequencyType } from '../../models/frequencyType';
import { Plant } from '../../models/plant';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  ApiUrl = environment.apiUrl;
  needsAction : boolean;

  constructor(private http: HttpClient) { }

  getTypes() {
    return this.http.get(this.ApiUrl + 'dashboard').pipe(
      map((data: FrequencyType[]) => {
        return data;
      })
    );
  }

  getPlants() {
    return this.http.get(this.ApiUrl + 'dashboard/plants/').pipe(
      map((data: Plant[]) => {
        return data;
      })
    );
  }

  addPlant(model: any) {
    return this.http.post(this.ApiUrl + 'dashboard/add', model).pipe(
      map((response: Action) => {
        return response;
      })
    );
  }

  needAction(needId: number, plantId: number, typeId: number){
     return this.http.get(this.ApiUrl + 'dashboard/action/'+needId+'/'+plantId+'/'+typeId).pipe(
      map((response: boolean) => {
        return response;
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Action } from '../../models/action';
import { DashboardPlant } from '../../models/dashboardPlant';
import { FrequencyType } from '../../models/frequencyType';
import { Plant } from '../../models/plant';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  needsAction : boolean;

  constructor(private http: HttpClient) { }

  getTypes() {
    return this.http.get(environment.apiUrl + 'dashboard/types').pipe(
      map((data: FrequencyType[]) => {
        return data;
      })
    );
  }

  getPlants(typeId: number) {
    return this.http.get(environment.apiUrl + 'dashboard/plants/'+typeId).pipe(
      map((data: DashboardPlant[]) => {
        return data;
      })
    );
  }

  addPlant(model: any) {
    return this.http.post(environment.apiUrl + 'dashboard/add', model).pipe(
      map((response: Action) => {
        return response;
      })
    );
  }

  needAction(needId: number, plantId: number, typeId: number){
     return this.http.get(environment.apiUrl + 'dashboard/action/'+needId+'/'+plantId+'/'+typeId).pipe(
      map((response: boolean) => {
        return response;
      })
    );
  }
}

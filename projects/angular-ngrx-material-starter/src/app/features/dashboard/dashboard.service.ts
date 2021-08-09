import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  needsAction: boolean;

  constructor(private http: HttpClient) { }

  getTypes() {
    return this.http.get(environment.apiUrl + 'dashboard/types').pipe(data => {
      return data;
    });
  }

  getPlants(typeId: number) {
    return this.http.get(environment.apiUrl + 'dashboard/plants/'+typeId).pipe(data => {
      return data;
    });
  }

  addAction(model: any) {
    return this.http.post(environment.apiUrl + 'dashboard/add', model).pipe(response => {
      return response;
    });
  }

  needAction(needId: number, plantId: number, typeId: number) {
    return this.http.get(environment.apiUrl + 'dashboard/action/' + needId + '/' + plantId + '/' + typeId).pipe(response => {
      return response;
    });
  }
}

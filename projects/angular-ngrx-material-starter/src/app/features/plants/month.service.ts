import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonthService {

  constructor(private http: HttpClient) {}

  getMonths() {
    return this.http.get(environment.apiUrl + 'month').pipe(data=> {
        return data;
      });
  }
}

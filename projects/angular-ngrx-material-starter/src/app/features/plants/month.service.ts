import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Month } from '../../models/month';

@Injectable({
  providedIn: 'root'
})
export class MonthService {
  ApiUrl = 'https://localhost:44366/api/';

  constructor(private http: HttpClient) { }

  getMonths(){
    return this.http.get(this.ApiUrl + 'month').pipe(
      map((data: Month[]) => {
        return data;
      })
    );
  }
}

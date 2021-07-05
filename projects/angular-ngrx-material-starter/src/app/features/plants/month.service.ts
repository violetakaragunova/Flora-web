import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Month } from '../../models/month';

@Injectable({
  providedIn: 'root'
})
export class MonthService {

  constructor(private http: HttpClient) {}

  getMonths() {
    return this.http.get(environment.apiUrl + 'month').pipe(
      map((data: Month[]) => {
        return data;
      })
    );
  }
}

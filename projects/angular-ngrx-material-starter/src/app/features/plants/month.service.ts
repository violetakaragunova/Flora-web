import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Month } from '../../models/month';

@Injectable({
  providedIn: 'root'
})
export class MonthService {
  ApiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMonths() {
    return this.http.get(this.ApiUrl + 'month').pipe(
      map((data: Month[]) => {
        return data;
      })
    );
  }
}

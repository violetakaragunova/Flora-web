import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getRooms() {
    return this.http.get(environment.apiUrl + 'room').pipe(data=> {
        return data;
      });
  }
}

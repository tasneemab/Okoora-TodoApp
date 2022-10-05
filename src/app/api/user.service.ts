import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * POST: authenticate user
   *
   * @param {object} data user credentials
   */
  login(data: object) {
    return this.http.post(`${environment.apiUrl}/users`, data);
  }
}

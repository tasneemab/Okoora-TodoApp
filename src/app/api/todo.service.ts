import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * DELETE: delete record
   *
   * @param id record id
   */
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/todos/${id}`);
  }

  /**
   * GET: fetch records
   *
   * @param params search params
   */
  index(id: number, params: any) {
    const options = {
      params: new HttpParams({ fromObject: params })
    }
    return this.http.get(`${environment.apiUrl}/users/${id}/todos`, options)
  }

  /**
   * POST: create new record
   *
   * @param data record data
   */
  store(data: object) {
    return this.http.post(`${environment.apiUrl}/todos`, data);
  }

  /**
   * PUT: update record
   *
   * @param id record id
   * @param data record new data
   */
  update(id: number, data: object) {
    return this.http.put(`${environment.apiUrl}/todos/${id}`, data);
  }
}

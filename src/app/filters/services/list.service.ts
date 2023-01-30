import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListFilter } from '../modals/list.modal';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ListService {
  baseUrl = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) {}

  fetchList(filters: ListFilter = {}) {
    return this.http
      .post(`${this.baseUrl}products`, filters, {
        observe: 'response',
      })
      .pipe(map((t: any) => t.body.data));
  }
}

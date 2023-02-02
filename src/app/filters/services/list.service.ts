import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListFilter } from '../modals/list.modal';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

  fetchList(filters: ListFilter = {}) {
    return this.http
      .post(environment.apiUrl + 'products', filters, {
        observe: 'response',
      })
      .pipe(map((t: any) => t.body.data));
  }

  fetchProductDetails(id: string) {
    return this.http
      .get(environment.apiUrl + `products?id=${id}`, {
        observe: 'response',
      })
      .pipe(map((t: any) => t.body.data));
  }
}

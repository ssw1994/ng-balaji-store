import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  fetchOrdersCount(userId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}orders/count?id=${userId}`, {
      observe: 'body',
    });
  }

  fetchMyOrders(userId: string) {
    return this.http.get(`${environment.apiUrl}orders?id=${userId}`, {
      observe: 'body',
    });
  }
}

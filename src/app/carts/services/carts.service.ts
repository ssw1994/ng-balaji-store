import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs';
import { AbstractOrder } from '../../common';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  constructor(private http: HttpClient) {}

  getCartItemQuantity(id: string | null) {
    return this.http.get(environment.apiUrl + `carts/quantity?id=${id}`).pipe(
      filter((t: any) => t.data && t.data.length >= 1),
      map((t: any) => t.data[0]),
      map((t: any) => {
        return t.count;
      })
    );
  }

  getCartSummary(id: string | null) {
    return this.http
      .get(environment.apiUrl + `carts/summary?id=${id}`, {
        observe: 'response',
      })
      .pipe(map((t) => t.body));
  }

  getCartItems(id: string | null) {
    return this.http
      .get(environment.apiUrl + `carts/items?id=${id}`, {
        observe: 'response',
      })
      .pipe(map((t) => t.body));
  }

  updateQuantity(payload: {
    cartId: string;
    productId: string;
    quantity: number;
  }) {
    return this.http
      .post(environment.apiUrl + 'carts/update/quantity', payload, {
        observe: 'response',
      })
      .pipe(map((t) => t.body));
  }

  removeFromCart(id: string, cartId: string) {
    return this.http
      .post(
        environment.apiUrl + `carts/remove?id=${cartId}`,
        {
          product_id: id,
        },
        {
          observe: 'response',
        }
      )
      .pipe(map((t) => t.body));
  }

  placeOrder(order: AbstractOrder) {
    return this.http.post(`${environment.apiUrl}carts/order`, order, {
      observe: 'body',
    });
  }
}

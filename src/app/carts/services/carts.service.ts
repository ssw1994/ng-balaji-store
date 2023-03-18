import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { filter, map } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  getCartItems(id: string) {
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
}

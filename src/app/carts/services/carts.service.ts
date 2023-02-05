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
}

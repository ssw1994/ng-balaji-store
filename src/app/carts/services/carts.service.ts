import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  constructor(private http: HttpClient) {}

  getCartItemQuantity(id: string | null) {
    return this.http
      .get(environment.apiUrl + `carts/quantity?id=${id}`)
      .pipe(map((t: any) => t.body.data));
  }
}

import { Injectable } from '@angular/core';
import { ListService } from './list.service';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Array<any> = [];

  constructor(private listService: ListService, private http: HttpClient) {
    try {
      this.fetchProducts();
    } catch (error) {
      console.error(error);
    }
  }

  async fetchProducts() {
    try {
      const data = await firstValueFrom(this.listService.fetchList());
      this.products = data;
    } catch (error) {
      console.error(error);
    }
  }

  async getProductDetails(id: string) {
    const data = await firstValueFrom(this.listService.fetchProductDetails(id));
    return data;
  }

  addToCart(payload: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'products/addtocart', payload, {
      observe: 'response',
    });
  }
}

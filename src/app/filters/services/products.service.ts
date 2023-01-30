import { Injectable } from '@angular/core';
import { ListService } from './list.service';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Array<any> = [];

  constructor(private listService: ListService) {
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
}

import { Injectable } from '@angular/core';
import { ProductFilters } from '@balaji_models';
import { Store } from '@ngrx/store';
import { filterProducts, updateFilters } from '../actions/filters.actions';
import { isLoadingProducts, products } from '../selectors/filters.selectors';

@Injectable({
  providedIn: 'root',
})
export class FilterFacade {
  products = {
    data$: this.store.select(products),
    loading$: this.store.select(isLoadingProducts),
  };

  constructor(private store: Store) {}

  fetchProducts(filters?: ProductFilters) {
    this.store.dispatch(filterProducts({ filters }));
  }

  updateFilters(filters: ProductFilters) {
    console.log(filters);
    this.store.dispatch(updateFilters({ filters }));
  }
}

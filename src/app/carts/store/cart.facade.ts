import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  fetchCartItems,
  fetchCartItemsCount,
  fetchCartSummary,
} from './cart.actions';

import {
  cartItems,
  cartSummary,
  isLoadingCartItems,
  isSummaryLoading,
} from './cart.selectors';
@Injectable({
  providedIn: 'root',
})
export class CartFacade {
  cartItems = {
    data: this.store.select(cartItems),
    isLoading: this.store.select(isLoadingCartItems),
  };

  cartSummary = {
    data: this.store.select(cartSummary),
    isLoading: this.store.select(isSummaryLoading),
  };

  constructor(private store: Store) {}

  fetchCartItems() {
    this.store.dispatch(fetchCartItems());
  }

  fetchCartSummary() {
    this.store.dispatch(fetchCartSummary());
  }

  fetchCartItemsCount() {
    this.store.dispatch(fetchCartItemsCount());
  }
}

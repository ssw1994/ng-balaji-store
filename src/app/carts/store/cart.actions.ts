import { createAction, props } from '@ngrx/store';
import { CartItem, CartSummary } from '../models/cart.model';

export const fetchCartItems = createAction('[Cart] Fetch cart items');
export const fetchCartItemsSuccess = createAction(
  '[Cart] Fetch cart item success',
  props<{ cartItems: Array<CartItem> }>()
);
export const fetchCartItemsFailure = createAction(
  '[Cart] Fetch cart item failure'
);

export const fetchCartSummary = createAction('[Cart] Fetch cart summary');
export const fetchCartSummarySuccess = createAction(
  '[Cart] Fetch cart summary success',
  props<{ summary: CartSummary }>()
);
export const fetchCartSummaryFailure = createAction(
  '[Cart] Fetch cart summary failure'
);

export const fetchCartItemsCount = createAction('[Cart] Fetch cart count');
export const fetchCartItemsCountSuccess = createAction(
  '[Cart] fetch cart item count success',
  props<{ count: number }>()
);
export const fetchCartItemsCountFailure = createAction(
  '[Cart] Fetch cart item count failure'
);

import { Status } from '@balaji_models';
import { createFeature, createReducer, on } from '@ngrx/store';
import { CartItem, CartSummary } from '../models/cart.model';
import {
  fetchCartItems,
  fetchCartItemsCount,
  fetchCartItemsCountFailure,
  fetchCartItemsCountSuccess,
  fetchCartItemsFailure,
  fetchCartItemsSuccess,
  fetchCartSummary,
  fetchCartSummaryFailure,
  fetchCartSummarySuccess,
} from './cart.actions';

export interface CartState {
  summary: CartSummary | null;
  count: number | null;
  cartItems: Array<CartItem>;
  actions: {
    summary: Status;
    count: Status;
    cartItems: Status;
  };
}

export const initial_state: CartState = {
  summary: null,
  count: null,
  cartItems: [],
  actions: {
    summary: Status.none,
    count: Status.none,
    cartItems: Status.none,
  },
};

export const cartFeature = createFeature({
  name: 'CART',
  reducer: createReducer(
    initial_state,
    on(fetchCartSummary, (state) => ({
      ...state,
      actions: {
        ...state.actions,
        summary: Status.busy,
      },
    })),
    on(fetchCartSummarySuccess, (state, { summary }) => ({
      ...state,
      summary: summary,
      actions: {
        ...state.actions,
        summary: Status.success,
      },
    })),
    on(fetchCartSummaryFailure, (state) => ({
      ...state,
      actions: {
        ...state.actions,
        summary: Status.error,
      },
    })),
    on(fetchCartItemsCount, (state) => ({
      ...state,
      actions: {
        ...state.actions,
        count: Status.busy,
      },
    })),
    on(fetchCartItemsCountSuccess, (state, { count }) => ({
      ...state,
      count: count,
      actions: {
        ...state.actions,
        count: Status.success,
      },
    })),
    on(fetchCartItemsCountFailure, (state) => ({
      ...state,
      actions: {
        ...state.actions,
        count: Status.error,
      },
    })),
    on(fetchCartItems, (state) => ({
      ...state,
      actions: {
        ...state.actions,
        cartItems: Status.busy,
      },
    })),
    on(fetchCartItemsSuccess, (state, { cartItems }) => ({
      ...state,
      cartItems: cartItems,
      actions: {
        ...state.actions,
        cartItems: Status.success,
      },
    })),
    on(fetchCartItemsFailure, (state) => ({
      ...state,
      actions: {
        ...state.actions,
        cartItems: Status.error,
      },
    }))
  ),
});

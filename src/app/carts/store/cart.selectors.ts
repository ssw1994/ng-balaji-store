import { Status } from '@balaji_models';
import { createSelector } from '@ngrx/store';
import { cartFeature } from './cart.reducer';

export const isSummaryLoading = createSelector(
  cartFeature.selectActions,
  (actions) => actions.summary === Status.busy
);

export const cartActions = createSelector(
  cartFeature.selectActions,
  (actions) => actions
);

export const cartItems = createSelector(
  cartFeature.selectCartItems,
  (cartItems) => cartItems
);

export const cartCount = createSelector(
  cartFeature.selectCount,
  (count) => count
);

export const cartSummary = createSelector(
  cartFeature.selectSummary,
  (summary) => summary
);

export const isLoadingCartItems = createSelector(
  cartActions,
  (actions) => actions.cartItems === Status.busy
);

import { createSelector } from '@ngrx/store';
import { authFeature } from '../reducers/auth.reducer';

export const token = createSelector(authFeature.selectToken, (token) => token);
export const userId = createSelector(
  authFeature.selectUserId,
  (userId) => userId
);

export const cartId = createSelector(
  authFeature.selectCartId,
  (cartId) => cartId
);

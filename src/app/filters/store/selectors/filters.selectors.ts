import { Status } from '@balaji_models';
import { createSelector } from '@ngrx/store';
import { filterFeature } from '../reducers/filters.reducers';

export const products = createSelector(
  filterFeature.selectProducts,
  (products) => products
);

export const actions = createSelector(
  filterFeature.selectActions,
  (actions) => actions
);

export const isLoadingProducts = createSelector(
  actions,
  (action) => action.products === Status.busy
);

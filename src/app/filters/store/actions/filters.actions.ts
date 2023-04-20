import { ProductFilters } from '@balaji_models';
import { createAction, props } from '@ngrx/store';

export const filterProducts = createAction(
  '[Filter] filter products',
  props<{ filters: ProductFilters | undefined }>()
);

export const updateFilters = createAction(
  '[Filter] update filters',
  props<{ filters: ProductFilters | undefined }>()
);
export const filterProductsSuccess = createAction(
  '[Filter] filter products success',
  props<{ products: Array<any> }>()
);
export const filterProductsError = createAction(
  '[Filter] filter products error'
);

export const fetchRecommendations = createAction(
  '[Filter] fetch recommendation',
  props<{
    category: string;
  }>()
);

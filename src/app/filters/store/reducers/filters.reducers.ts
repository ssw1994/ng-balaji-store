import { Action, createFeature, createReducer, on } from '@ngrx/store';
import {
  filterProducts,
  filterProductsError,
  filterProductsSuccess,
  updateFilters,
} from '../actions/filters.actions';
import { ProductFilters, Status } from '../../../common/models';
export interface FilterState {
  products: Array<any>;
  filters: ProductFilters | undefined;
  actions: {
    products: Status;
  };
}

const initial_state: FilterState = {
  products: [],
  filters: undefined,
  actions: {
    products: Status.none,
  },
};

export const filterFeature = createFeature({
  name: 'FILTER',
  reducer: createReducer(
    initial_state,
    on(filterProducts, (state) => ({
      ...state,
      actions: {
        ...state.actions,
        products: Status.busy,
      },
    })),
    on(filterProductsSuccess, (state, { products }) => ({
      ...state,
      products: products,
      actions: {
        ...state.actions,
        products: Status.success,
      },
    })),
    on(filterProductsError, (state) => ({
      ...state,
      actions: {
        ...state.actions,
        products: Status.error,
      },
    })),
    on(updateFilters, (state, { filters }) => ({
      ...state,
      filters: {
        ...state.filters,
        ...filters,
      },
    }))
  ),
});

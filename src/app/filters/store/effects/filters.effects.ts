import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { of, switchMap, catchError, tap } from 'rxjs';

import { ListService } from '../../services/list.service';
import {
  filterProducts,
  filterProductsError,
  filterProductsSuccess,
  updateFilters,
} from '../actions/filters.actions';
import { filterFeature } from '../reducers/filters.reducers';

@Injectable()
export class FilterEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private listService: ListService
  ) {}

  filterProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(filterProducts),
      switchMap((action) =>
        this.listService.fetchList(action.filters).pipe(
          map((response: any) => {
            return filterProductsSuccess({
              products: response,
            });
          }),
          catchError((error) => of(filterProductsError()))
        )
      )
    )
  );

  filterProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(filterProductsSuccess),
        tap(() => {
          console.log('Product fetched successfully');
        })
      ),
    { dispatch: false }
  );

  filterProductError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(filterProductsError),
      tap(() => {
        console.log('Error in fetching products');
      })
    )
  );

  updateFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFilters),
      concatLatestFrom(() => this.store.select(filterFeature.selectFilters)),
      map(([action, filters]) => {
        return filterProducts({ filters });
      })
    )
  );
}

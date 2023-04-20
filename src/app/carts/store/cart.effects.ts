import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { of } from 'rxjs';
import { tap } from 'rxjs';
import { catchError } from 'rxjs';
import { switchMap } from 'rxjs';
import { AuthFacade } from 'src/app/auth/store/facades/auth.facade';
import { CartsService } from '../services/carts.service';
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

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private cartService: CartsService,
    private authFacade: AuthFacade
  ) {}

  fetchCartSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCartSummary),
      concatLatestFrom(() => [this.authFacade.cartId$]),
      switchMap(([action, cartId]) => {
        return this.cartService.getCartSummary(cartId).pipe(
          map((response: any) => {
            return fetchCartSummarySuccess({ summary: response });
          }),
          catchError((error) => of(fetchCartSummaryFailure()))
        );
      })
    )
  );

  fetchCartSummarySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchCartSummarySuccess),
        tap(() => {
          console.log('Summary fetched');
        })
      ),
    { dispatch: false }
  );

  fetchCartSummaryFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchCartSummaryFailure),
        tap(() => {
          console.log('Error in fetching cart summary');
        })
      ),
    { dispatch: false }
  );

  fetchCartItemsCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCartItemsCount),
      concatLatestFrom(() => [this.authFacade.cartId$]),
      switchMap(([action, cartId]) => {
        return this.cartService.getCartItemQuantity(cartId).pipe(
          map((response: any) => {
            return fetchCartItemsCountSuccess({ count: response });
          }),
          catchError((error) => of(fetchCartItemsCountFailure()))
        );
      })
    )
  );

  fetchCartItemsCountSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchCartItemsCountSuccess),
        tap(() => {
          console.log('Fetch cart items count success');
        })
      ),
    { dispatch: false }
  );

  fetchCartItemsCountFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchCartItemsCountFailure),
        tap(() => {
          console.log('Error in fetching cart count');
        })
      ),
    { dispatch: false }
  );

  fetchCartItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCartItems),
      concatLatestFrom(() => [this.authFacade.cartId$]),
      switchMap(([action, cartId]) =>
        this.cartService.getCartItems(cartId).pipe(
          map(({ data }: any) => {
            return fetchCartItemsSuccess({ cartItems: data });
          }),
          catchError((error) => of(fetchCartItemsFailure()))
        )
      )
    )
  );

  fetchCartItemsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchCartItemsSuccess),
        tap(() => {
          console.log('fetch cart items success');
        })
      ),
    { dispatch: false }
  );

  fetchCartItemsFailure = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchCartItemsFailure),
        tap(() => {
          console.log('Fetch cart items error');
        })
      ),
    { dispatch: false }
  );
}

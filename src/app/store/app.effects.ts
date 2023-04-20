import { Injectable } from '@angular/core';
import { Page } from '@balaji_models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, of, tap } from 'rxjs';
import { NavigationService } from '../common';
import { navigate, navigateFailure, navigateSuccess } from './app.actions';

@Injectable()
export class AppEffect {
  constructor(
    private actions$: Actions,
    private navigationService: NavigationService,
    private store: Store
  ) {}
  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigate),
        tap(async (action) => {
          const page: Page = {
            pageName: action.pageName,
            pageURI: action.pageURI,
          };
          try {
            await this.navigationService.setPage(page);
            this.store.dispatch(navigateSuccess(page));
          } catch (error: any) {
            return this.store.dispatch(navigateFailure(error));
          }
        })
      ),
    { dispatch: false }
  );

  navigateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigateSuccess),
        tap((action) => {
          console.log('Navigated to --->', action.pageName);
        })
      ),
    { dispatch: false }
  );

  navigateFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigateFailure),
        tap((action) => {
          console.log('Error in navigation --->', action.error);
        })
      ),
    { dispatch: false }
  );
}

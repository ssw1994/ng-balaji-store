import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { catchError, map, of, switchMap } from 'rxjs';
import { navigate } from 'src/app/store/app.actions';
import { AuthService } from '../../services/auth.service';
import {
  authenticate,
  authenticateFailure,
  authenticateSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
  register,
  registerFailure,
  registerSuccess,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions, private authService: AuthService) {}

  authenticate$ = createEffect(() =>
    this.action$.pipe(
      ofType(authenticate),
      switchMap((action) =>
        this.authService
          .authenticate({
            username: action.username,
            password: action.password,
          })
          .pipe(
            map((response: any) => {
              return authenticateSuccess(response);
            }),
            catchError((error) => of(authenticateFailure()))
          )
      )
    )
  );

  authenticateSuccess$ = createEffect(() =>
    this.action$.pipe(
      ofType(authenticateSuccess),
      map(() => {
        return navigate({
          pageName: 'home',
          pageURI: ['/', 'products'],
        });
      })
    )
  );

  autheticateFailure$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(authenticateFailure),
        tap(() => {
          console.error('Error in login');
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.action$.pipe(
      ofType(register),
      switchMap((action) =>
        this.authService.register(action).pipe(
          map((response) => {
            return registerSuccess();
          }),
          catchError((error) => of(registerFailure()))
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(registerSuccess),
        tap(() => {
          console.log('Register success');
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(registerFailure),
        tap(() => {
          console.error('Error in registration');
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.action$.pipe(
      ofType(logout),
      map((action) => {
        if (this.clearLocalStorageItems()) {
          return logoutSuccess();
        } else {
          return logoutFailure();
        }
      })
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(logoutSuccess),
        tap(() => {
          localStorage.clear();
          console.log('Logged out successfully');
        })
      ),
    { dispatch: false }
  );

  logoutFailure = createEffect(
    () =>
      this.action$.pipe(
        ofType(logoutFailure),
        tap(() => {
          console.log('Error in logging out');
        })
      ),
    { dispatch: false }
  );

  private clearLocalStorageItems(): boolean {
    if (window.localStorage) {
      window.localStorage.clear();
      return true;
    }
    return false;
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginPayload, RegisterPayload } from '../../models/auth.model';
import { authenticate, logout, register } from '../actions/auth.actions';
import { cartId, userId } from '../selectors/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  userId$ = this.store.select(userId);
  cartId$ = this.store.select(cartId);
  constructor(private store: Store) {}

  authenticate(payload: LoginPayload) {
    this.store.dispatch(authenticate(payload));
  }

  register(payload: RegisterPayload) {
    this.store.dispatch(register(payload));
  }

  logout() {
    this.store.dispatch(logout());
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../auth/store/actions/auth.actions';
import { Page } from '../common/models/app.models';
import { navigate } from './app.actions';

@Injectable({
  providedIn: 'root',
})
export class AppFacde {
  constructor(private store: Store) {}

  navigate(page: Page) {
    this.store.dispatch(navigate(page));
  }
  logout() {
    this.store.dispatch(logout());
  }
}

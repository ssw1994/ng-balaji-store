import { Status } from '@balaji_models';
import { createFeature, createReducer, on } from '@ngrx/store';
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

export interface AuthState {
  token: string | null;
  userId: string | null;
  cartId: string | null;

  actions: {
    login: Status;
    register: Status;
  };
}

export const initial_state: AuthState = {
  token: null,
  userId: null,
  cartId: null,
  actions: {
    login: Status.none,
    register: Status.none,
  },
};

export const authFeature = createFeature({
  name: 'AUTH',
  reducer: createReducer(
    initial_state,
    on(authenticate, (state) => ({
      ...state,
      actions: {
        ...state.actions,
        login: Status.busy,
      },
    })),
    on(authenticateSuccess, (state, { userId, cartId }) => ({
      ...state,
      userId,
      cartId,
      actions: {
        ...state.actions,
        login: Status.success,
      },
    })),
    on(authenticateFailure, (state) => ({
      ...state,
      actions: {
        ...state.actions,
        login: Status.error,
      },
    })),
    on(register, (state) => ({
      ...state,
      actions: {
        ...state.actions,
        register: Status.busy,
      },
    })),
    on(registerSuccess, (state) => ({
      ...state,
      actions: {
        ...state.actions,
        register: Status.success,
      },
    })),
    on(registerFailure, (state) => ({
      ...state,
      actions: {
        ...state.actions,
        register: Status.error,
      },
    })),
    on(logout, (state) => ({
      ...state,
      actions: {
        ...state.actions,
        login: Status.busy,
      },
    })),
    on(logoutSuccess, (state) => ({
      ...state,
      actions: {
        ...state.actions,
        login: Status.none,
      },
    })),
    on(logoutFailure, (state) => ({
      ...state,
      actions: {
        ...state.actions,
        login: Status.success,
      },
    }))
  ),
});

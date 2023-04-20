import { createAction, props } from '@ngrx/store';
import { LoginPayload, RegisterPayload } from '../../models/auth.model';

export const authenticate = createAction(
  '[Auth] Authenticate user',
  props<LoginPayload>()
);

export const authenticateSuccess = createAction(
  '[Auth] Authenticate user succcess',
  props<{
    userId: string;
    cartId: string;
  }>()
);
export const authenticateFailure = createAction('[Auth] Authenticate failure');

export const register = createAction(
  '[Auth] Register user',
  props<RegisterPayload>()
);

export const registerSuccess = createAction('[Auth] Register user success');
export const registerFailure = createAction('[Auth] Register user failure');

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout success');
export const logoutFailure = createAction('[Auth] Logout failure');

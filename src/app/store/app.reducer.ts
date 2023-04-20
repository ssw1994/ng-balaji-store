import { createFeature, createReducer, on } from '@ngrx/store';
import { Page, Status } from '../common/models/app.models';
import { navigate, navigateFailure, navigateSuccess } from './app.actions';

interface APP_STATE extends Page {
  error: string | Error | null;
  actions: {
    navigate: Status;
  };
}

const initial_state: APP_STATE = {
  pageName: null,
  pageURI: null,
  error: null,
  actions: {
    navigate: Status.none,
  },
};

export const appFeature = createFeature({
  name: 'APP',
  reducer: createReducer(
    initial_state,
    on(navigate, (state) => ({
      ...state,
      actions: {
        ...state.actions,
        navigate: Status.busy,
      },
    })),
    on(navigateSuccess, (state, { pageName, pageURI }) => ({
      ...state,
      pageName: pageName,
      pageURI: pageURI,
      actions: {
        ...state.actions,
        navigate: Status.success,
      },
    })),
    on(navigateFailure, (state, { error }) => ({
      ...state,
      error: error,
    }))
  ),
});

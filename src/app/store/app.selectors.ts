import { createSelector } from '@ngrx/store';
import { appFeature } from './app.reducer';
export const currentPage = createSelector(
  appFeature.selectPageName,
  (userId) => userId
);

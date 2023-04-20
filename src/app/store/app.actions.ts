import { createAction, props } from '@ngrx/store';
import { Page } from '../common/models/app.models';

export const navigate = createAction('[Nav] navigate', props<Page>());
export const navigateSuccess = createAction(
  '[Nav] navigation success',
  props<Page>()
);

export const navigateFailure = createAction(
  '[Nav] navigation failure',
  props<{ error: string | Error }>()
);

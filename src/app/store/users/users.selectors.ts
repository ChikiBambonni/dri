import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '..';
import { State } from './users.reducer';

export const selectApp = createFeatureSelector<AppState>('app');

export const selectUsersState = createSelector(
  selectApp,
  (state: AppState) => state.app
);

export const selectUsers = createSelector(
  selectUsersState,
  (state: State) => state.users
);

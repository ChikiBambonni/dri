import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './users.reducer';

export const selectUsersState = createFeatureSelector<any>('users'); // TODO: add typing

export const selectUsers = createSelector(
  selectUsersState,
  (state: State) => state.users
);

export const selectUserById = (id: number) =>
  createSelector(selectUsers, (users) => users.find((user) => user.id === id));

export const selectTotalUsers = createSelector(
  selectUsersState,
  (state: State) => state.totalUsers
);

export const selectIsLoadingUsers = createSelector(
  selectUsersState,
  (state: State) => state.isLoadingUsers
);

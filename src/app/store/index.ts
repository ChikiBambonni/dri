import { ActionReducerMap } from '@ngrx/store';

import * as fromUsers from './users';

export interface AppState {
  users: fromUsers.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  users: fromUsers.reducer,
};

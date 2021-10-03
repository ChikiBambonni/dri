import { ActionReducerMap } from '@ngrx/store';

import * as fromUsers from './users';

export interface AppState {
  app: fromUsers.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  app: fromUsers.reducer,
};

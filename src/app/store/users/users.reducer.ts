import { Action, createReducer, on } from '@ngrx/store';
import { IUser } from '@core/interfaces';

import { setUsers } from './users.actions';

export interface State {
  users: IUser[];
}

export const initialState: State = {
  users: [],
};

const usersReducer = createReducer(
  initialState,
  on(setUsers, (state, { users }) => ({
    ...state,
    users,
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return usersReducer(state, action);
}

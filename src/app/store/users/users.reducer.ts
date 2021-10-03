import { Action, createReducer, on } from '@ngrx/store';
import { IUser } from '@core/interfaces';

import { fetchUsers, setUser, setUsers } from './users.actions';

export interface State {
  users: IUser[];
  totalUsers: number;
  isLoadingUsers: boolean;
}

export const initialState: State = {
  users: [],
  totalUsers: 0,
  isLoadingUsers: false,
};

const usersReducer = createReducer(
  initialState,
  on(fetchUsers, (state) => ({
    ...state,
    isLoadingUsers: true,
  })),
  on(setUsers, (state, { users, totalUsers }) => ({
    ...state,
    users,
    totalUsers,
    isLoadingUsers: false,
  })),
  on(setUser, (state, { user }) => {
    const stateUser = state.users.find((u) => u.id === user.id);

    return {
      ...state,
      users: stateUser
        ? state.users.map((u) => (u.id === user.id ? user : u))
        : [...state.users, user],
    };
  })
);

export function reducer(state: State | undefined, action: Action): State {
  return usersReducer(state, action);
}

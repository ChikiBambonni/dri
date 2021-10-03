import { Action, createReducer, on } from '@ngrx/store';
import { IUser } from '@core/interfaces';

import {
  fetchUsers,
  removeUser,
  setUser,
  setUsers,
  updateUser,
} from './users.actions';

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
  }),
  on(removeUser, (state, { userId }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== +userId),
  })),
  on(updateUser, (state, { userId, user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === +userId ? user : u)),
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return usersReducer(state, action);
}

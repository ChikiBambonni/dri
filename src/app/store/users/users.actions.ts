import { createAction, props } from '@ngrx/store';
import { IPaginationOptions, IUser } from '@core/interfaces';

const ENTITY = '[Users]';

export const fetchUsers = createAction(
  `${ENTITY} Fetch users`,
  props<{ options: IPaginationOptions }>()
);

export const setUsers = createAction(
  `${ENTITY} Set users`,
  props<{ users: IUser[]; totalUsers: number }>()
);

export const fetchUser = createAction(
  `${ENTITY} Fetch user`,
  props<{ userId: string }>()
);

export const setUser = createAction(
  `${ENTITY} Set user`,
  props<{ user: IUser }>()
);

export const removeUser = createAction(
  `${ENTITY} Remove user`,
  props<{ userId: string }>()
);

export const updateUser = createAction(
  `${ENTITY} Update user`,
  props<{ userId: string; user: IUser }>()
);

export const addNewUser = createAction(
  `${ENTITY} Add new user`,
  props<{ user: IUser }>()
);

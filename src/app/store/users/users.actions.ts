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

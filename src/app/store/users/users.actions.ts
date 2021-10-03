import { createAction, props } from '@ngrx/store';
import { IUser } from '@core/interfaces';

const ENTITY = '[Users]';

export const setUsers = createAction(
  `${ENTITY} Set users`,
  props<{ users: IUser[] }>()
);

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { UsersHttpService } from '@core/services';

import { fetchUser, fetchUsers, setUser, setUsers } from './users.actions';

@Injectable()
export class UsersEffects {
  fetchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUsers),
      switchMap(({ options }) =>
        this.usersHttpService.getUsers(options).pipe(
          map((componentResponse) => {
            const users = componentResponse.value?.elements ?? [];
            const totalUsers = componentResponse.value?.totalElements ?? 0;
            return setUsers({ users, totalUsers });
          })
        )
      )
    )
  );

  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUser),
      switchMap(({ userId }) =>
        this.usersHttpService.getUser(userId).pipe(
          map((componentResponse) => {
            const user = componentResponse.value!;
            return setUser({ user });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usersHttpService: UsersHttpService
  ) {}
}

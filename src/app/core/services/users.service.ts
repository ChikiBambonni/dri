import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsersRepository } from '@core/abstractions';
import { IPaginationOptions, IUser } from '@core/interfaces';
import {
  State,
  selectUsers,
  selectUserById,
  selectIsLoadingUsers,
  fetchUsers,
  selectTotalUsers,
  fetchUser,
} from '@store/users';

@Injectable()
export class UsersService extends UsersRepository {
  constructor(private appStore: Store<State>) {
    super();
  }

  fetchAll(options?: IPaginationOptions): void {
    if (options) {
      this.appStore.dispatch(fetchUsers({ options }));
    }
  }

  getAll(): Observable<IUser[]> {
    return this.appStore.select(selectUsers);
  }

  getLoadingAll(): Observable<boolean> {
    return this.appStore.select(selectIsLoadingUsers);
  }

  getCount(): Observable<number> {
    return this.appStore.select(selectTotalUsers);
  }

  fetch(userId: string): void {
    this.appStore.dispatch(fetchUser({ userId }));
  }

  get(id: string): Observable<IUser | undefined> {
    return this.appStore.select(selectUserById(+id));
  }
}

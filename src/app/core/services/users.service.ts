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
  removeUser,
  updateUser,
  addNewUser,
} from '@store/users';

/**
 * UsersService which uses Redux for state management,
 * if we want to switch from Redux to another lib just
 * {extends UsersRepository} and implement all required methods
 */
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

  remove(userId: string): void {
    this.appStore.dispatch(removeUser({ userId }));
  }

  update(userId: string, user: IUser): void {
    this.appStore.dispatch(updateUser({ userId, user }));
  }

  add(user: IUser): void {
    this.appStore.dispatch(addNewUser({ user }));
  }
}

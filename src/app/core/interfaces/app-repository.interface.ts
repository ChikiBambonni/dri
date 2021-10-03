import { Observable } from 'rxjs';

import { IUser } from './user.interfaces';
import { IComponentResponse } from './http.interfaces';
import {
  IPaginationInterface,
  IPaginationOptions,
} from './pagination.interface';

export interface IAppRepository {
  getUsers(
    options: IPaginationOptions
  ): Observable<IComponentResponse<IPaginationInterface<IUser>>>;

  getUser(userId: string): Observable<IComponentResponse<IUser>>;
}

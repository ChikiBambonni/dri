import { Observable } from 'rxjs';

import { IUser } from './user.interfaces';
import { IComponentResponse } from './http.interfaces';
import { IPagination, IPaginationOptions } from './pagination.interface';

export interface IUsersHttp {
  getUsers(
    options: IPaginationOptions
  ): Observable<IComponentResponse<IPagination<IUser>>>;

  getUser(userId: string): Observable<IComponentResponse<IUser>>;
}

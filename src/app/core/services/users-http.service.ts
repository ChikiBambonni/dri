import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@environment';
import { BaseApi } from '@core/utils';
import {
  IUser,
  IPaginationOptions,
  IComponentResponse,
  IPagination,
  IDictionary,
  IUsersHttp,
} from '@core/interfaces';

@Injectable()
export class UsersHttpService extends BaseApi implements IUsersHttp {
  private usersUrl = `${environment.api}/users`;

  constructor(private http: HttpClient) {
    super();
  }

  getUsers(
    options: IPaginationOptions
  ): Observable<IComponentResponse<IPagination<IUser>>> {
    return this.http
      .get<IPagination<IUser>>(this.usersUrl, {
        params: this.getRequestParams(
          options as unknown as IDictionary<string>
        ),
      })
      .pipe(
        map((res: IPagination<IUser>) => this.getSuccessBody(res)),
        catchError((error: HttpErrorResponse) =>
          of(this.getErrorBody<IPagination<IUser>>(error))
        )
      );
  }

  getUser(userId: string): Observable<IComponentResponse<IUser>> {
    return this.http.get<IUser>(`${this.usersUrl}/${userId}`).pipe(
      map((res: IUser) => this.getSuccessBody(res)),
      catchError((error: HttpErrorResponse) =>
        of(this.getErrorBody<IUser>(error))
      )
    );
  }
}

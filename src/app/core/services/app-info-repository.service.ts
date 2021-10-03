import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@environment';
import { BaseApi } from '@core/utils';
import {
  IUser,
  IAppRepository,
  IPaginationOptions,
  IComponentResponse,
  IPaginationInterface,
  IDictionary,
} from '@core/interfaces';

@Injectable()
export class AppRepository extends BaseApi implements IAppRepository {
  private usersUrl = `${environment.api}/users`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getUsers(
    options: IPaginationOptions
  ): Observable<IComponentResponse<IPaginationInterface<IUser>>> {
    return this.httpClient
      .get<IPaginationInterface<IUser>>(this.usersUrl, {
        params: this.getRequestParams(
          options as unknown as IDictionary<string>
        ),
      })
      .pipe(
        map((res: IPaginationInterface<IUser>) => this.getSuccessBody(res)),
        catchError((error: HttpErrorResponse) =>
          of(this.getErrorBody<IPaginationInterface<IUser>>(error))
        )
      );
  }
}

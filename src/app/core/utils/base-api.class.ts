import { HttpErrorResponse } from '@angular/common/http';
import {
  IErrorResponse,
  IBackendHttpError,
  IComponentResponse,
} from '@core/interfaces';
import { Safe } from '@core/decorators';

import { HttpUtils } from './http-utils.class';

export abstract class BaseApi extends HttpUtils {
  @Safe({ returnValue: null })
  protected parseError(e: HttpErrorResponse): IBackendHttpError {
    return JSON.parse(e.error);
  }

  protected getHttpFetchError(response: HttpErrorResponse): IErrorResponse {
    return {
      errorCode: 1,
      errorMessage: 'Error while fetching.',
      body: this.parseError(response),
    };
  }

  protected getSuccessBody<T>(body: T): IComponentResponse<T> {
    return {
      value: body,
      error: null,
    };
  }

  protected getErrorBody<T>(
    response: HttpErrorResponse
  ): IComponentResponse<T> {
    return {
      value: null,
      error: this.getHttpFetchError(response),
    };
  }
}

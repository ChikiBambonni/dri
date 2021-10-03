import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { isEmptyObj } from '@core/utils';
import { IDictionary } from '@core/interfaces';

import { MockBackendService } from './mock-backend.service';
import { defaultMockDelay } from './mock-backend-config.constant';

@Injectable()
export class MockDataInterceptor implements HttpInterceptor {
  constructor(private mockDataService: MockBackendService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.mockDataService.isMock()) {
      const entity = MockBackendService.keys.find((option: any) =>
        option.pattern.match(req.url)
      );

      if (entity) {
        const params = entity.pattern.match(req.url);

        const requestParams = {
          queryParams: this.getParams(req),
          params,
        };

        return of(
          new HttpResponse({
            status: 200,
            body: entity.mock.getData(requestParams, req.body),
          })
        ).pipe(delay(entity.mock.delay || defaultMockDelay));
      }
    }

    return next.handle(req);
  }

  private getParams(clone: HttpRequest<any>) {
    const params: IDictionary<string> = {};
    const cloneParams = clone.params['map'];
    cloneParams?.forEach((value: any, key: any) => (params[key] = value[0]));
    return params;
  }
}

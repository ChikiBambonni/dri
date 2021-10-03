import { HttpParams } from '@angular/common/http';
import { IDictionary } from '@core/interfaces';
import { Safe } from '@core/decorators';

export abstract class HttpUtils {
  @Safe({ returnValue: null })
  protected getRequestParams(params: IDictionary<string> | null): HttpParams {
    let requestParams: HttpParams = new HttpParams();

    if (params) {
      Object.keys(params)
        .filter(
          (key: string) => params[key] !== undefined && params[key] !== null
        )
        .forEach(
          (key: string) =>
            (requestParams = this.updateParams(requestParams, key, params[key]))
        );
    }

    return requestParams;
  }

  protected updateParams(
    base: HttpParams,
    key: string,
    value: string
  ): HttpParams {
    return base.set(key, value);
  }
}

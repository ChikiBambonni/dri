import { environment } from '@environment';
import { IDictionary } from '@core/interfaces';

import { MockBackendOption } from './mock-backend.interfaces';

export class MockBackendUrl {
  constructor(public config: IDictionary<any>) {} // TODO: add typing

  getConfig(): IDictionary<any> {
    const map = Object.keys(this.config);
    const urls: IDictionary<string> = {};
    map.forEach((type: string) => {
      const urlList = Object.keys(this.config[type]);

      urlList.forEach(
        (url: string) =>
          (urls[`${environment.api}${url}`] = this.config[type][url])
      );
    });

    return urls;
  }

  createMap(
    options: IDictionary<MockBackendOption>
  ): Map<string, MockBackendOption> {
    const map = new Map<string, MockBackendOption>();
    Object.keys(options).forEach((key: string) => map.set(key, options[key]));

    return map;
  }
}

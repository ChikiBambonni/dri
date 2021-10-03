import { ApiType } from '@core/enums';

import { UserMocks } from './mocks/users/users.class';
import { MockBackendUrl } from './mock-backend-url.class';

const UrlsConfig = {
  [ApiType.API]: {
    '/users': new UserMocks(),
  },
};

export const MockBackendConfig: MockBackendUrl = new MockBackendUrl(UrlsConfig);

export const defaultMockDelay = 400;

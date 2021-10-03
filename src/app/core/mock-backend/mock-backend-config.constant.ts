import { ApiType } from '@core/enums';

import { UserMocks } from './mocks/users/users.class';
import { MockBackendUrl } from './mock-backend-url.class';

const userMocks = new UserMocks();

const UrlsConfig = {
  [ApiType.API]: {
    '/users': userMocks,
    '/users(/:id)': userMocks,
  },
};

export const MockBackendConfig: MockBackendUrl = new MockBackendUrl(UrlsConfig);

export const defaultMockDelay = 400;

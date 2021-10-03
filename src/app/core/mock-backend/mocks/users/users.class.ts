import { IUser, IPagination, IRequestParams } from '@core/interfaces';

import { mockUsers } from './users.constants';
import { MockBackendFactory } from '../../mock-backend.class';

export class UserMocks extends MockBackendFactory<IUser> {
  constructor() {
    super(mockUsers);
  }

  getData(params: IRequestParams): IPagination<IUser> | IUser | undefined {
    const userId = params.params.id;
    if (userId) {
      return this.find((user) => user.id === +userId);
    }

    return this.getTableData(params);
  }
}

import {
  IUser,
  IPaginationOptions,
  IPaginationInterface,
} from '@core/interfaces';

import { mockUsers } from './users.constants';
import { MockBackendFactory } from '../../mock-backend.class';

export class UserMocks extends MockBackendFactory<IUser> {
  constructor() {
    super(mockUsers);
  }

  getData(options: IPaginationOptions): IPaginationInterface<IUser> {
    return this.getTableData(options);
  }
}

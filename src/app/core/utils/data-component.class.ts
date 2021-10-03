import { IErrorResponse } from '@core/interfaces';

export abstract class DataComponent {
  error?: IErrorResponse;
  isLoading: boolean = true;
  noDataToDisplay: boolean = false;

  constructor() {}
}

import { IErrorResponse } from '@core/interfaces';

export abstract class DataComponent {
  isLoading: boolean = false;
  noDataToDisplay: boolean = false;
  error: IErrorResponse | null = null;
}

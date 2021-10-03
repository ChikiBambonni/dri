import { IErrorResponse } from '@core/interfaces';

export abstract class DataComponent {
  isLoading: boolean = true;
  noDataToDisplay: boolean = false;
  error: IErrorResponse | null = null;
}

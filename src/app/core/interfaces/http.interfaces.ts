export interface IBackendHttpError {
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: string | number;
}

export interface IErrorResponse {
  errorCode: number;
  errorMessage: string;
  body?: IBackendHttpError;
}

export interface IComponentResponse<T> {
  error: IErrorResponse | null;
  value: T | null;
}

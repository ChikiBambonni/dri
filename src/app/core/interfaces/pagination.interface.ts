export interface IPaginationOptions {
  page: number;
  pagesize: number;
  totalPages: number;
  totalElements: number;
}

export interface IPaginationInterface<T> extends IPaginationOptions {
  elements: T[];
}

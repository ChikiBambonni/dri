export interface IPaginationOptions {
  page: number;
  pagesize: number;
  totalPages?: number;
  totalElements?: number;
}

export interface IPagination<T> extends IPaginationOptions {
  elements: T[];
}

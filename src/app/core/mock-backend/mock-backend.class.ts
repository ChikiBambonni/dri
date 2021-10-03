import { IPaginationInterface, IPaginationOptions } from '@core/interfaces';

export abstract class MockBackendFactory<T> {
  abstract getData(
    options: IPaginationOptions
  ): T | T[] | IPaginationInterface<T>;

  constructor(private items: T[]) {}

  protected getTableData(options: IPaginationOptions): IPaginationInterface<T> {
    const pagesize: number = this.getPageSize(options.pagesize);
    const page: number = this.getPageNumber(options.page);

    const offset: number = (page - 1) * pagesize;
    const offsetElements = this.items.slice(offset, offset + Number(pagesize));

    return {
      totalPages: Math.ceil(this.items.length / pagesize),
      totalElements: this.items.length,
      elements: offsetElements,
      page,
      pagesize,
    };
  }

  private getPageNumber(pageNumber: number | null, defaultValue = 1): number {
    return pageNumber && Number.isInteger(Number(pageNumber))
      ? pageNumber
      : defaultValue;
  }

  private getPageSize(pageSize: number | null, defaultValue = 10): number {
    return pageSize && Number.isInteger(Number(pageSize))
      ? pageSize
      : defaultValue;
  }
}

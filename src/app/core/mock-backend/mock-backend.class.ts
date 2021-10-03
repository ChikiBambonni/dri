import { IPaginationInterface, IRequestParams } from '@core/interfaces';

export abstract class MockBackendFactory<T> {
  abstract getData(
    params: IRequestParams
  ): T | T[] | IPaginationInterface<T> | undefined;

  constructor(private items: T[]) {}

  protected find(functor: (value: T) => boolean): T | undefined {
    return this.items.find(functor);
  }

  protected getTableData(params: IRequestParams): IPaginationInterface<T> {
    const pagesize = this.getPageSize(+params.queryParams.pagesize);
    const page = this.getPageNumber(+params.queryParams.page);

    const offset = (page - 1) * pagesize;
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

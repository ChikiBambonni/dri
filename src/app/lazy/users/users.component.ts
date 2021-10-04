import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataComponent } from '@core/utils';
import { IDictionary, IUser } from '@core/interfaces';
import { UsersRepository } from '@core/abstractions';
import { TakeUntilDestroy } from '@core/decorators';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';

import { DEFAULT_PAGE } from './users.constants';

@Component({
  selector: 'app-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
@TakeUntilDestroy
export class UsersComponent extends DataComponent implements OnInit, OnDestroy {
  @ViewChild('paginator')
  paginatorComponent?: PaginatorComponent;

  page: PageEvent = DEFAULT_PAGE;

  dataColumns = ['id', 'email', 'role'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  private componentDestroy!: () => Observable<any>;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private repository: UsersRepository
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchData(this.page);
    this.subscribeToDataChange();
  }

  ngOnDestroy(): void {}

  onChangePage($event: PageEvent) {
    this.page = $event;
    this.isLoading = true;
    this.fetchData(this.page);
  }

  onRowClick($event: IUser): void {
    const { id } = $event;
    this.router.navigate(['/users', id]);
  }

  onAddRow($event: IDictionary<any>): void {
    const user = $event as IUser;
    this.repository.add(user);
  }

  onDeleteRow($event: IDictionary<any>): void {
    const id: string = $event.id;
    this.repository.remove(id);
  }

  onEditRow($event: IDictionary<any>): void {
    const id: string = $event.id;
    const user = $event as IUser;
    this.repository.update(id, user);
  }

  private fetchData(page: PageEvent): void {
    this.repository.fetchAll({
      pagesize: page.pageSize,
      page: page.pageIndex + 1,
    });
  }

  private subscribeToDataChange(): void {
    this.repository
      .getAll()
      .pipe(takeUntil(this.componentDestroy()))
      .subscribe((users) => {
        this.dataSource.data = users;
        this.cd.markForCheck();
      });

    this.repository
      .getLoadingAll()
      .pipe(takeUntil(this.componentDestroy()))
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
        this.cd.markForCheck();
      });

    this.repository
      .getCount()
      .pipe(takeUntil(this.componentDestroy()))
      .subscribe((count) => {
        this.page.length = count;
        this.cd.markForCheck();
      });
  }
}

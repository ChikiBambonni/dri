import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataComponent } from '@core/utils';
import { AppRepository } from '@core/services';
import { IDictionary, IUser } from '@core/interfaces';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';

import { DEFAULT_PAGE } from './users.constants';

@Component({
  selector: 'app-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent extends DataComponent implements OnInit {
  @ViewChild('paginator')
  paginatorComponent?: PaginatorComponent;

  page: PageEvent = DEFAULT_PAGE;

  dataColumns = ['id', 'email', 'role'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private repository: AppRepository
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchData(this.page);
  }

  onChangePage($event: PageEvent) {
    this.page = $event;
    this.isLoading = true;
    this.fetchData(this.page);
  }

  onRowClick($event: IUser): void {
    console.log($event);
    const { id } = $event;
    this.router.navigate(['/users', id]);
  }

  onAddRow($event: IDictionary<any>): void {
    console.log('onAddRow', $event);
  }

  onDeleteRow($event: IDictionary<any>): void {
    console.log('onDeleteRow', $event);
  }

  onEditRow($event: IDictionary<any>): void {
    console.log('onEditRow', $event);
  }

  private fetchData(page: PageEvent): void {
    this.repository
      .getUsers({
        pagesize: page.pageSize,
        page: page.pageIndex + 1,
      })
      .pipe(
        tap((response) => {
          this.isLoading = false;
          this.error = response.error;
          this.cd.markForCheck();
        }),
        filter((response) => !response.error)
      )
      .subscribe((response) => {
        const { elements, totalElements } = response.value!;

        this.dataSource.data = elements;
        this.page.length = totalElements ?? 0;
        this.cd.markForCheck();
      });
  }
}

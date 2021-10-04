import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  OnChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TrackChanges } from '@core/decorators';
import { IDictionary } from '@core/interfaces';
import {
  faEdit,
  faPlusSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { ITableAction } from './table.interfaces';
import {
  UpdateDialogComponent,
  UpdateDialogType,
} from './components/update-dialog';
import { IUpdateDialogData } from './components/update-dialog/update-dialog.interfaces';

@Component({
  selector: 'app-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @ViewChild('tableDiv')
  tableDiv?: ElementRef;

  @Input()
  dataColumns?: string[];

  @Input()
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @Output()
  readonly rowClick = new EventEmitter<any>();

  @Output()
  readonly addRow = new EventEmitter<IDictionary<any>>();

  @Output()
  readonly deleteRow = new EventEmitter<IDictionary<any>>();

  @Output()
  readonly editRow = new EventEmitter<IDictionary<any>>();

  columns?: string[];
  actions: ITableAction[] = [
    {
      title: 'Add',
      icon: faPlusSquare,
      callback: ($event, element) => {
        $event.stopPropagation();
        this.addRowCallback(element);
      },
    },
    {
      title: 'Delete',
      icon: faTrash,
      callback: ($event, element) => {
        $event.stopPropagation();
        this.deleteRowCallback(element);
      },
    },
    {
      title: 'Edit',
      icon: faEdit,
      callback: ($event, element) => {
        $event.stopPropagation();
        this.editRowCallback(element);
      },
    },
  ];

  constructor(private readonly dialog: MatDialog) {}

  ngOnInit() {}

  @TrackChanges('dataColumns', 'setTableColumns')
  ngOnChanges() {}

  onRowClick(row: IDictionary<any>) {
    this.rowClick.emit(row);
  }

  protected setTableColumns(columns: string[]): void {
    this.columns = [...columns, 'actions'];
  }

  private openUpdateDialog(data: IUpdateDialogData): Observable<unknown> {
    return this.dialog
      .open(UpdateDialogComponent, { width: '450px', data })
      .afterClosed()
      .pipe(filter(Boolean));
  }

  private addRowCallback(element: IDictionary<any>): void {
    const data: IUpdateDialogData = {
      title: 'Add row',
      type: UpdateDialogType.ADD,
      columns: Object.keys(element).map((key) => ({
        label: key,
        type: Number.isInteger(element[key]) ? 'number' : 'text',
        value: null,
      })),
    };

    this.openUpdateDialog(data).subscribe((res) => {
      const data = this.getData(res as IUpdateDialogData);
      this.addRow.emit(data);
    });
  }

  private editRowCallback(element: IDictionary<any>): void {
    const data: IUpdateDialogData = {
      title: 'Edit row',
      type: UpdateDialogType.EDIT,
      columns: Object.keys(element).map((key) => ({
        label: key,
        type: Number.isInteger(element[key]) ? 'number' : 'text',
        value: element[key],
      })),
    };

    this.openUpdateDialog(data).subscribe((res) => {
      const data = this.getData(res as IUpdateDialogData);
      this.editRow.emit(data);
    });
  }

  private deleteRowCallback(element: IDictionary<any>): void {
    this.deleteRow.emit(element);
  }

  private getData(dialogData: IUpdateDialogData): IDictionary<any> {
    return dialogData.columns.reduce<IDictionary<any>>(
      (acc, curr) => ({
        ...acc,
        [curr.label]: curr.value,
      }),
      {}
    );
  }
}

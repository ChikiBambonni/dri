import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input()
  displayedColumns?: string[];

  @Input()
  dataSource?: MatTableDataSource<any>;

  @Output()
  rowClick: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('tableDiv')
  tableDiv?: ElementRef;

  constructor() {}

  ngOnInit() {}

  rowHandler(row: any) {
    this.rowClick.emit(row);
  }
}

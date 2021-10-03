import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input()
  length?: number;

  @Input()
  pageSize?: number;

  @Input()
  pageSizeOptions?: number[];

  @Output()
  page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  @ViewChild('matpaginator') paginator?: MatPaginator;

  constructor() {}

  ngOnInit() {}

  chagePage($event: PageEvent) {
    this.page.emit($event);
  }
}

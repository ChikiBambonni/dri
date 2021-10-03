import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { TableComponent } from './table.component';
import { SpinnerModule } from '../spinner/spinner.module';

@NgModule({
  imports: [CommonModule, MatTableModule, SpinnerModule],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class TableModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TableComponent } from './table.component';
import { SpinnerModule } from '../spinner/spinner.module';
import { UpdateDialogModule } from './components/update-dialog';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    FontAwesomeModule,
    SpinnerModule,
    UpdateDialogModule,
  ],
  declarations: [TableComponent],
  exports: [TableComponent],
})
export class TableModule {}

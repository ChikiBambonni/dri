import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  TableModule,
  SpinnerModule,
  PaginatorModule,
} from '@shared/components';

import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatCardModule,
    SpinnerModule,
    TableModule,
    PaginatorModule,
  ],
  declarations: [UsersComponent],
  exports: [UsersComponent],
})
export class UsersModule {}

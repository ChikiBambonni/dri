import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpinnerModule } from '@shared/components';

import { UserDetailsComponent } from './user-details.component';
import { UserDetailsRoutingModule } from './user-details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserDetailsRoutingModule,
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule,
    SpinnerModule,
  ],
  declarations: [UserDetailsComponent],
  exports: [UserDetailsComponent],
})
export class UserDetailsModule {}

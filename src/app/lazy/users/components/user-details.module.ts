import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailsComponent } from './user-details.component';
import { UserDetailsRoutingModule } from './user-details-routing.module';

@NgModule({
  imports: [CommonModule, UserDetailsRoutingModule],
  declarations: [UserDetailsComponent],
  exports: [UserDetailsComponent],
})
export class UserDetailsModule {}

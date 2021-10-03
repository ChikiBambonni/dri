import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IUpdateDialogData } from './update-dialog.interfaces';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUpdateDialogData,
    private readonly dialogRef: MatDialogRef<UpdateDialogComponent>
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

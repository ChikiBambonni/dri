import { UpdateDialogType } from './update-dialog.enums';

/**
 * To extend this functionality we should add validations as well
 */
export interface IColumnDescriptor {
  label: string;
  type: 'text' | 'number';
  value: string | number | null;
}

export interface IUpdateDialogData {
  title: string;
  type: UpdateDialogType;
  columns: IColumnDescriptor[];
}

import { UpdateDialogType } from './update-dialog.enums';

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

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { IDictionary } from '@core/interfaces';

export interface ITableAction {
  title: string;
  icon: IconDefinition;
  callback: (element: IDictionary<any>) => void;
}

import { SimpleChanges } from '@angular/core';
import { IDictionary } from '@core/interfaces';

export enum ChangesStrategy {
  First = 'firstTime',
  Each = 'eachTime',
  NonFirst = 'nonFirst',
}

export function TrackChanges<Type>(
  key: string,
  methodName: string,
  strategy: ChangesStrategy = ChangesStrategy.Each
) {
  return function (
    targetClass: IDictionary<any>,
    functionName: string,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    const source = descriptor.value;

    descriptor.value = function (changes: SimpleChanges) {
      if (changes && changes[key] && changes[key].currentValue) {
        const isFirstChange = changes[key].firstChange;

        if (
          strategy === ChangesStrategy.Each ||
          (strategy === ChangesStrategy.First && isFirstChange) ||
          (strategy === ChangesStrategy.NonFirst && !isFirstChange)
        ) {
          targetClass[methodName].call(this, changes[key].currentValue as Type);
        }
      }

      return source.call(this, changes);
    };

    return descriptor;
  };
}

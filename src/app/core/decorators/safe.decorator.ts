import { IDictionary } from '@core/interfaces';

export enum SafeLogLevel {
  Default = 'Default',
  Console = 'Console',
  ErrorHandler = 'ErrorHandler',
}

export interface SafeParams<T> {
  logLevel?: SafeLogLevel;
  returnValue?: T;
}

export function Safe<T>(params: SafeParams<T> = {}): Function {
  return function (
    target: object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ): TypedPropertyDescriptor<any> {
    const originalMethod = descriptor.value;
    const logLevel = params.logLevel || SafeLogLevel.Default;

    descriptor.value = function SafeWrapper(this: IDictionary<any>) {
      try {
        return originalMethod.apply(this, arguments);
      } catch (error) {
        if (logLevel === SafeLogLevel.Console) {
          console.error(error);
        }

        if (logLevel === SafeLogLevel.ErrorHandler) {
          if (!this.errorHandler) {
            throw new Error(`
                Class with 'Safe' decorator and logLevel 'ErrorHandler'
                should have 'errorHandler' class property with 'ErrorHandler' class.`);
          } else {
            this.errorHandler.handleError(error);
          }
        }

        return params.returnValue || false;
      }
    };

    return descriptor;
  };
}

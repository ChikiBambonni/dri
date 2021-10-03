import { Injectable } from '@angular/core';

import { Safe } from '@core/decorators/safe.decorator';

@Injectable()
export class StorageService {
  @Safe()
  static getItem<T>(key: string): T | null {
    const sessionKey = sessionStorage.getItem(key);
    const localStorageKey = localStorage.getItem(key);

    if (sessionKey) {
      return this.fromJson(sessionKey);
    }

    if (localStorageKey) {
      return this.fromJson(localStorageKey);
    }

    return null;
  }

  @Safe()
  static setItem<T>(key: string, valueObj: T, remember: boolean = true) {
    if (remember) {
      localStorage.setItem(key, this.toJson<T>(valueObj));
    } else {
      sessionStorage.setItem(key, this.toJson<T>(valueObj));
    }
  }

  @Safe()
  static removeItem(key: string) {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  }

  static fromJson<T>(value: string): T {
    return JSON.parse(value);
  }

  static toJson<T>(value: T): string {
    return JSON.stringify(value);
  }
}

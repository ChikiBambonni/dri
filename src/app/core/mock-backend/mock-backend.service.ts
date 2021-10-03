import { Injectable } from '@angular/core';

import { StorageService } from '@core/services/storage.service';
import { MockBackendOption } from './mock-backend.interfaces';
import { BackendDataMode } from './mock-backend.enum';
import { MockBackendUrl } from './mock-backend-url.class';

import * as UrlPattern from 'url-pattern';

@Injectable()
export class MockBackendService {
  static options: Map<string, MockBackendOption>;

  static keys: any;

  private readonly key = 'mock_data_service_v1';
  private mode: BackendDataMode = BackendDataMode.Mock;
  private defaultMode: BackendDataMode = BackendDataMode.Mock;

  constructor() {
    this.setMode(StorageService.getItem(this.key) || this.defaultMode);
  }

  static initConfig(configUrl: MockBackendUrl): void {
    const options = configUrl.getConfig();

    this.keys = Object.keys(options).map((key) => ({
      path: key,
      pattern: new UrlPattern(key),
      mock: options[key],
    }));

    this.options = configUrl.createMap(options);
  }

  initGlobalMethods(): void {
    // TODO: add typing
    (window as any).setMockMode = () => {
      this.setMode(BackendDataMode.Mock, true);
    };

    (window as any).setRealMode = () => {
      this.setMode(BackendDataMode.Real, true);
    };
  }

  getMode(): BackendDataMode {
    return this.mode;
  }

  setMode(mode: BackendDataMode, reload: boolean = false): void {
    this.mode = mode;
    this.changeMode(mode, reload);
  }

  isMock(): boolean {
    return this.mode === BackendDataMode.Mock;
  }

  private changeMode(mode: BackendDataMode, reload: boolean): void {
    StorageService.setItem(this.key, mode.toString());

    if (reload) {
      window.location.reload();
    }
  }
}

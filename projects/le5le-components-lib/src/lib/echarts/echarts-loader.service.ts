import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class EchartsLoaderService {
  loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _path = '/assets/echarts.min.js';

  constructor(private _ngZone: NgZone) {
    this.load();
  }

  load() {
    enum LoadStatus {
      Loading = 1,
      Loaded
    }

    if ((<any>window).echartsLoad >= LoadStatus.Loading) {
      if ((<any>window).echartsLoad > LoadStatus.Loading) {
        this._ngZone.run(() => this.loaded.next(true));
      }
      return;
    }
    (<any>window).echartsLoad = LoadStatus.Loading;
    const loaderScript = document.createElement('script');
    loaderScript.type = 'text/javascript';
    loaderScript.src = this._path;
    document.body.appendChild(loaderScript);
    loaderScript.addEventListener('load', () => {
      this._ngZone.run(() => this.loaded.next(true));
      (<any>window).echartsLoad = LoadStatus.Loaded;
    });
  }
}

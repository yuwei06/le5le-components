import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare var echarts: any;

enum LoadStatus {
  Loading = 1,
  Loaded
}

@Injectable()
export class EchartsLoaderService {
  loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _path = '/assets/echarts.min.js';

  constructor(private _ngZone: NgZone) {
    this.load();
  }

  load() {
    if ((<any>window).echartsLoad === LoadStatus.Loading) {
      return;
    }
    if ((<any>window).echartsLoad > LoadStatus.Loading) {
      if (echarts) {
        this._ngZone.run(() => this.loaded.next(true));
      } else {
        this.loadJs();
      }
    } else {
      this.loadJs();
    }
  }

  loadJs(reload?) {
    (<any>window).echartsLoad = LoadStatus.Loading;
    const loaderScript = document.createElement('script');
    loaderScript.type = 'text/javascript';
    let path = this._path;
    if (reload) {
      path += '?t=' + new Date().getTime();
    }
    loaderScript.src = path;
    document.body.appendChild(loaderScript);
    loaderScript.addEventListener('load', () => {
      // echarts容易加载失败
      setTimeout(() => {
        if (echarts) {
          this._ngZone.run(() => this.loaded.next(true));
          (<any>window).echartsLoad = LoadStatus.Loaded;
        } else {
          this.loadJs(true);
        }
      }, 200);
    });
  }
}

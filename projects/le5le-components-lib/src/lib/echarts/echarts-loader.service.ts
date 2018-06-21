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
    const loaderScript = document.createElement('script');
    loaderScript.type = 'text/javascript';
    loaderScript.src = this._path;
    document.body.appendChild(loaderScript);
    loaderScript.addEventListener('load', () => {
      this._ngZone.run(() => this.loaded.next(true));
    });
  }
}

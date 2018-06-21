import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MonacoEditorLoaderService {
  loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _path = 'assets/monaco/vs';
  set monacoPath(value) {
    if (value) {
      this._path = value + '/vs';
    }
  }

  constructor(private _ngZone: NgZone) {
    this.load();
  }

  // Load monaco
  load() {
    const onGotAmdLoader = () => {
      (<any>window).require.config({ paths: { vs: this._path } });
      (<any>window).require(['vs/editor/editor.main'], () => {
        this._ngZone.run(() => this.loaded.next(true));
      });
    };

    // Load AMD loader if necessary
    if (!(<any>window).require) {
      const loaderScript = document.createElement('script');
      loaderScript.type = 'text/javascript';
      loaderScript.src = `${this._path}/loader.js`;
      loaderScript.addEventListener('load', onGotAmdLoader);
      document.body.appendChild(loaderScript);
    } else {
      onGotAmdLoader();
    }
  }
}

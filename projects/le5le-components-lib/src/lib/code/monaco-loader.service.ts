import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MonacoEditorLoaderService {
  isMonacoLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _monacoPath = 'assets/monaco/vs';
  set monacoPath(value) {
    if (value) {
      this._monacoPath = value + '/vs';
    }
  }

  private _ngZone: NgZone;
  constructor(ngZone: NgZone) {
    this._ngZone = ngZone;
    this.load();
  }

  // Load monaco
  load() {
    const onGotAmdLoader = () => {
      (<any>window).require.config({ paths: { vs: this._monacoPath } });
      (<any>window).require(['vs/editor/editor.main'], () => {
        this._ngZone.run(() => this.isMonacoLoaded.next(true));
      });
    };

    // Load AMD loader if necessary
    if (!(<any>window).require) {
      const loaderScript = document.createElement('script');
      loaderScript.type = 'text/javascript';
      loaderScript.src = `${this._monacoPath}/loader.js`;
      loaderScript.addEventListener('load', onGotAmdLoader);
      document.body.appendChild(loaderScript);
    } else {
      onGotAmdLoader();
    }
  }
}

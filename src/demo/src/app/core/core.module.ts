import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

import { StoreService, CookieService } from 'le5le-store';

import { NoticeService } from 'le5le-components';
import { HttpService } from '../http/http.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: [NoticeService, HttpService]
})
export class CoreModule {
  private socket: WebSocket;
  private socketCallback: any = {};
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    private _router: Router,
    private _storeService: StoreService,
    private _httpService: HttpService
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }

    this._storeService.set('author', 'alsmile');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/timeout';

import { NoticeService } from 'le5le-components';
import { CookieService, StoreService } from 'le5le-store';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(protected store: StoreService) {}

  private getToken(): string {
    const remember: any = localStorage.getItem('rememberMe');
    if (remember) {
      return localStorage.getItem((<any>window).token);
    } else {
      return CookieService.get((<any>window).token);
    }
  }

  private setToken(token: string) {
    const domains = document.domain.split('.');
    let strDomain = '';
    for (let i = domains.length - 1; i > 0 && i > domains.length - 4; --i) {
      strDomain = domains[i] + '.' + strDomain;
    }
    strDomain = strDomain.substr(0, strDomain.length - 1);

    const remember: any = localStorage.getItem('rememberMe');
    if (remember) {
      localStorage.setItem((<any>window).token, token);
    } else {
      CookieService.set((<any>window).token, token, { domain: strDomain });
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({ headers: req.headers.set('token', this.getToken()) });
    // next.handle(authReq).timeout(30000).do
    return next
      .handle(authReq)
      .do(event => {
        if (event instanceof HttpResponse) {
          // Update token.
          if (event.headers.get((<any>window).token)) this.setToken(event.headers.get((<any>window).token));

          // Pop error.
          if (event.body.error) {
            let _noticeService: NoticeService = new NoticeService();
            _noticeService.notice({ body: event.body.error, theme: 'error', timeout: 20000 });
          } else if (event.body.code && event.body.code != 0) {
            event.body.error = event.body.message;
            let _noticeService: NoticeService = new NoticeService();
            _noticeService.notice({ body: event.body.message, theme: 'error', timeout: 20000 });
          }

          if (event.status === 401) {
            this.store.set('auth', -1);
          } else if (event.status == 403) {
            this.store.set('redirect', '/');
          } else if (event.status == 406) {
            this.store.set('auth', -2);
          }
        }
      })
      .catch((error, caught) => {
        if (error.status === 401) {
          this.store.set('auth', -1);
        } else if (error.status == 403) {
          this.store.set('redirect', '/');
        } else if (error.status == 406) {
          this.store.set('auth', -2);
        }
        return Observable.throw(error);
      });
  }
}

import {Injectable} from "@angular/core";

@Injectable()
export class CookieService {

  public static getCookie(name:string):string {
    let arr:RegExpMatchArray;
    let reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) return decodeURIComponent(arr[2]);
    else return '';
  }

  public static setCookie(name:string, value:string, expires?:number, path?:string, domain?:string) {
    let myWindow:any = window;
    let cookieStr = myWindow.escape(name) + '=' + myWindow.escape(value) + ';';

    if (expires) {
      let dtExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
      cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
    }
    if (path) {
      cookieStr += 'path=' + path + ';';
    }
    if (domain) {
      cookieStr += 'domain=' + domain + ';';
    }

    document.cookie = cookieStr;
  }

  public static deleteCookie(name:string, path?:string, domain?:string) {
    if (CookieService.getCookie(name)) {
      CookieService.setCookie(name, '', -1, path, domain);
    }
  }
}

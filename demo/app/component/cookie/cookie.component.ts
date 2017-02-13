import {Component} from '@angular/core';
import {CookieService} from "../../../../src/cookie/cookie.service";

@Component({
  selector: 'component-cookie',
  templateUrl: "cookie.component.html"
})
export class ComponentCookieComponent {
  private rand: string = '';
  constructor() {
  }

  onSetCookie () {
    CookieService.setCookie('rand', new Date().getTime()+'');
  }

  onGetCookie () {
    this.rand = CookieService.getCookie('rand');
  }
}

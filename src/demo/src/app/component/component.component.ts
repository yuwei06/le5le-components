import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'component-center',
  templateUrl: 'component.component.html',
  styleUrls: ['./component.component.pcss']
})
export class ComponentComponent {
  constructor(private _router: Router, private _activateRoute: ActivatedRoute) {}

  isActive(strUrl: string) {
    if (!strUrl || strUrl === '/') {
      return !this._router.url || this._router.url === '/';
    } else {
      return this._router.url.indexOf(strUrl) === 0;
    }
  }
}

import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService, CookieService } from 'le5le-store';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  providers: [],
  styleUrls: ['./home.component.pcss']
})
export class HomeComponent {
  constructor(private _router: Router, private _storeService: StoreService, private _activateRoute: ActivatedRoute) {}

  async ngOnInit() {}
}

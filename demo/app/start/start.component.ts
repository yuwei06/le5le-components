import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {StartService} from "./start.service";

@Component({
  selector: 'start',
  templateUrl: "start.component.html",
  providers: [ StartService]
})
export class StartComponent implements OnInit{

  constructor(private _StartService: StartService, private _router: Router) {
  }

  ngOnInit() {
  }

}

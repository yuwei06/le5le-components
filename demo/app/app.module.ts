import { NgModule }       from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { BrowserModule }  from '@angular/platform-browser';
import {HttpModule} from "@angular/http";

import {SharedModule} from "../shared/shared.module";
import {AppComponent} from "./app.component";
import {routing, appRoutingProviders} from "./app.routing";

import {HomeComponent} from "./home/home.component";
import {StartComponent} from "./start/start.component";
import {ComponentModule} from "./component/component.module";


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    ComponentModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    StartComponent,
  ],
  providers: [
    appRoutingProviders,
    // {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

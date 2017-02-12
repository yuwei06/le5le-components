import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';

import {componentRouting} from "./component.routing";
import {ComponentComponent} from "./component.component";
import {ComponentNoticeComponent} from "./notice/notice.component";

@NgModule({
  imports:       [CommonModule, componentRouting],
  declarations: [
    ComponentComponent,
    ComponentNoticeComponent
  ]
})
export class ComponentModule { }

import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import {routing} from "./shared.routing";
import {NoticeService} from "../../src/notice/notice.service";

@NgModule({
  imports:       [CommonModule,  FormsModule, routing],
  declarations: [
  ],
  exports:       [
    CommonModule,
    FormsModule,
  ],
  providers:     [
    NoticeService
  ]
})
export class SharedModule { }

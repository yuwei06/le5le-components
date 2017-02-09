import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import {routing} from "./shared.routing";

@NgModule({
  imports:       [CommonModule,  FormsModule, routing],
  declarations: [
  ],
  exports:       [
    CommonModule,
    FormsModule,
  ],
  providers:     [
  ]
})
export class SharedModule { }

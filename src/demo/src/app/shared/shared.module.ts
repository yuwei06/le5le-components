import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Le5leComponentsModule } from 'le5le-components';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, Le5leComponentsModule],
  declarations: [],
  exports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, Le5leComponentsModule],
  providers: []
})
export class SharedModule {}

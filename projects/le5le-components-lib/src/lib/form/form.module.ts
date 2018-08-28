import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BtnSavingDirective } from './btnSaving.directive';
import { TouchFormDirective } from './touchForm.directive';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [BtnSavingDirective, TouchFormDirective],
  exports: [BtnSavingDirective, TouchFormDirective]
})
export class FormModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { componentRouting } from './component.routing';
import { ComponentComponent } from './component.component';
import { ComponentNoticeComponent } from './notice/notice.component';
import { ComponentLazyLoadComponent } from './lazyLoad/lazyLoad.component';
import { ComponentEllipsisComponent } from './ellipsis/ellipsis.component';
import { ComponentSwitchComponent } from './switch/switch.component';
import { ComponentQrcodeComponent } from './qrcode/qrcode.component';
import { ComponentValidatorComponent } from './validator/validator.component';
import { ComponentFileUploadComponent } from './fileUpload/fileUpload.component';
import { ComponentEditorComponent } from './editor/editor.component';
import { ComponentBtnSavingComponent } from './btnSaving/btnSaving.component';
import { ComponentTouchFormComponent } from './touchForm/touchForm.component';
import { ComponentTimeComponent } from './time/time.component';

import {
  ImageLazyLoad,
  QRCodeComponent,
  SwitchComponent,
  EditorComponent,
  CalendarComponent,
  TimeComponent,
  TimepickerComponent,
  PasswordValidator,
  PhoneValidator,
  PositiveIntegerValidator,
  SameValidator,
  EmailValidator,
  BtnSavingDirective,
  TouchFormDirective,
  EllipsisPipe
} from '../../../../lib/src/index';

@NgModule({
  imports: [FormsModule, CommonModule, componentRouting],
  declarations: [
    ComponentComponent,
    ComponentNoticeComponent,
    ComponentLazyLoadComponent,
    CalendarComponent,
    TimeComponent,
    TimepickerComponent,
    ImageLazyLoad,
    EllipsisPipe,
    ComponentEllipsisComponent,
    ComponentSwitchComponent,
    SwitchComponent,
    ComponentQrcodeComponent,
    QRCodeComponent,
    ComponentValidatorComponent,
    PhoneValidator,
    PasswordValidator,
    PositiveIntegerValidator,
    SameValidator,
    EmailValidator,
    ComponentFileUploadComponent,
    ComponentEditorComponent,
    EditorComponent,
    BtnSavingDirective,
    TouchFormDirective,
    ComponentBtnSavingComponent,
    ComponentTouchFormComponent,
    ComponentTimeComponent
  ]
})
export class ComponentModule {}

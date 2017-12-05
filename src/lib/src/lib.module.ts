import { NgModule, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NoticeService } from './notice/notice.service';
import { ImageLazyLoad } from './lazyLoad/imgLazyLoad';
import { EllipsisPipe } from './pipe/ellipsis.pipe';
import { SwitchComponent } from './switch/switch.component';
import { QRCodeComponent } from './qrcode/qrcode.component';
import { PhoneValidator } from './validator/phone.directive';
import { PasswordValidator } from './validator/password.directive';
import { PositiveValidator } from './validator/positive.directive';
import { PositiveIntegerValidator } from './validator/positiveInteger.directive';
import { SameValidator } from './validator/same.directive';
import { EmailValidator } from './validator/email.directive';
import { UrlValidator } from './validator/url.directive';
import { MinValidator } from './validator/min.directive';
import { ImageUploadComponent } from './fileUpload/imageUpload.component';
import { EditorComponent } from './editor/editor.component';
import { UiLoadingComponent } from './loading/ui.loading.component';
import { BtnSavingDirective } from './form/btnSaving.directive';
import { TouchFormDirective } from './form/touchForm.directive';
import { PaginationComponent } from './pagination/pagination.component';
import { WizardHorizontalComponent } from './wizard/wizard-horizontal.component';
import { SelectComponent } from './select/select.component';
import { DivMoveDirective } from './move/divMove.directive';
import { RepExpValidator } from './validator/regExp.directive';
import { CalendarComponent } from './datetime/calendar.component';
import { TimeComponent } from './datetime/time.component';
import { TimepickerComponent } from './datetime/timepicker.component';
import { CodeComponent } from './code/code.component';
import { MonacoEditorLoaderService } from './code/monaco-loader.service';
import { XTermComponent } from './xterm/xterm.component';
import { SliderComponent } from './slider/slider.component';
import { EchartsComponent } from './echarts/echarts.component';
import { ValidatorService } from './validator/validator.service';
import { ProgressComponent } from './progress/progress.component';

const MODULES = [
  ImageLazyLoad,
  EllipsisPipe,
  SwitchComponent,
  QRCodeComponent,
  PhoneValidator,
  PasswordValidator,
  PositiveValidator,
  PositiveIntegerValidator,
  SameValidator,
  EmailValidator,
  UrlValidator,
  MinValidator,
  RepExpValidator,
  ImageUploadComponent,
  EditorComponent,
  UiLoadingComponent,
  PaginationComponent,
  WizardHorizontalComponent,
  SelectComponent,
  BtnSavingDirective,
  TouchFormDirective,
  DivMoveDirective,
  CalendarComponent,
  TimeComponent,
  TimepickerComponent,
  CodeComponent,
  XTermComponent,
  SliderComponent,
  EchartsComponent,
  ProgressComponent,
];

export function monacoFactory(ngZone: NgZone) {
  return new MonacoEditorLoaderService(ngZone);
}

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: MODULES,
  exports: MODULES,
  providers: [
    NoticeService,
    {
      provide: MonacoEditorLoaderService,
      deps: [NgZone],
      useFactory: monacoFactory
    }
  ]
})
export class Le5leComponentsModule {
}

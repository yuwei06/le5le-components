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
import { PositiveIntegerValidator } from './validator/positiveInteger.directive';
import { SameValidator } from './validator/same.directive';
import { EmailValidator } from './validator/email.directive';
import { UrlValidator } from './validator/url.directive';
import { MinValidator } from './validator/min.directive';
import { FileSelectDirective } from './fileUpload/fileSelect.directive';
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


export { NoticeService } from './notice/notice.service';
export { ImageLazyLoad } from './lazyLoad/imgLazyLoad';
export { EllipsisPipe } from './pipe/ellipsis.pipe';
export { SwitchComponent } from './switch/switch.component';
export { QRCodeComponent } from './qrcode/qrcode.component';
export { PhoneValidator } from './validator/phone.directive';
export { PasswordValidator } from './validator/password.directive';
export { PositiveIntegerValidator } from './validator/positiveInteger.directive';
export { SameValidator } from './validator/same.directive';
export { EmailValidator } from './validator/email.directive';
export { UrlValidator } from './validator/url.directive';
export { MinValidator } from './validator/min.directive';
export { RepExpValidator } from './validator/regExp.directive';
export { FileSelectDirective } from './fileUpload/fileSelect.directive';
export { ImageUploadComponent } from './fileUpload/imageUpload.component';
export { EditorComponent } from './editor/editor.component';
export { UiLoadingComponent } from './loading/ui.loading.component';
export { BtnSavingDirective } from './form/btnSaving.directive';
export { TouchFormDirective } from './form/touchForm.directive';
export { PaginationComponent } from './pagination/pagination.component';
export { WizardHorizontalComponent } from './wizard/wizard-horizontal.component';
export { SelectComponent } from './select/select.component';
export { DivMoveDirective } from './move/divMove.directive';
export { CalendarComponent } from './datetime/calendar.component';
export { TimeComponent } from './datetime/time.component';
export { TimepickerComponent } from './datetime/timepicker.component';
export { CodeComponent } from './code/code.component';
export { MonacoEditorLoaderService } from './code/monaco-loader.service';
export { XTermComponent } from './xterm/xterm.component';

const MODULES = [
  ImageLazyLoad,
  EllipsisPipe,
  SwitchComponent,
  QRCodeComponent,
  PhoneValidator,
  PasswordValidator,
  PositiveIntegerValidator,
  SameValidator,
  EmailValidator,
  UrlValidator,
  MinValidator,
  RepExpValidator,
  FileSelectDirective,
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

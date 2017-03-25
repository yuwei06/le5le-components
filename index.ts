import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NoticeService } from './src/notice/notice.service';
import { ImageLazyLoad } from './src/lazyLoad/imgLazyLoad';
import { EllipsisPipe } from './src/pipe/ellipsis.pipe';
import { SwitchComponent } from './src/switch/switch.component';
import { QRCodeComponent } from './src/qrcode/qrcode.component';
import { PhoneValidator } from './src/validator/phone.directive';
import { PasswordValidator } from './src/validator/password.directive';
import { PositiveIntegerValidator } from './src/validator/positiveInteger.directive';
import { SameValidator } from './src/validator/same.directive';
import { EmailValidator } from './src/validator/email.directive';
import { FileSelectDirective } from './src/fileUpload/fileSelect.directive';
import { FileUploadComponent } from './src/fileUpload/fileUpload.component';
import { EditorComponent } from './src/editor/editor.component';
import { BtnSavingDirective } from './src/form/btnSaving.directive';
import { TouchFormDirective } from './src/form/touchForm.directive';

export { NoticeService } from './src/notice/notice.service';
export { ImageLazyLoad } from './src/lazyLoad/imgLazyLoad';
export { EllipsisPipe } from './src/pipe/ellipsis.pipe';
export { SwitchComponent } from './src/switch/switch.component';
export { QRCodeComponent } from './src/qrcode/qrcode.component';
export { PhoneValidator } from './src/validator/phone.directive';
export { PasswordValidator } from './src/validator/password.directive';
export { PositiveIntegerValidator } from './src/validator/positiveInteger.directive';
export { SameValidator } from './src/validator/same.directive';
export { EmailValidator } from './src/validator/email.directive';
export { FileSelectDirective } from './src/fileUpload/fileSelect.directive';
export { FileUploadComponent } from './src/fileUpload/fileUpload.component';
export { EditorComponent } from './src/editor/editor.component';
export { BtnSavingDirective } from './src/form/btnSaving.directive';
export { TouchFormDirective } from './src/form/touchForm.directive';

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
  FileSelectDirective,
  FileUploadComponent,
  EditorComponent,
  BtnSavingDirective,
  TouchFormDirective,
];

@NgModule({
  imports: [],
  exports: MODULES
})
export class Le5leComponentsRootModule {
}

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: MODULES,
  exports: MODULES,
})
export class Le5leComponentsModule {
  /** @deprecated */
  public static forRoot(): ModuleWithProviders {
    return {ngModule: Le5leComponentsRootModule, providers: [NoticeService]};
  }
}

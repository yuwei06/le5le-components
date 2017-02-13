import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import {FormsModule} from "@angular/forms";

import {componentRouting} from "./component.routing";
import {ComponentComponent} from "./component.component";
import {ComponentNoticeComponent} from "./notice/notice.component";
import {ComponentLazyLoadComponent} from "./lazyLoad/lazyLoad.component";
import {ImageLazyLoad} from "../../../src/lazyLoad/imgLazyLoad";
import {ComponentCookieComponent} from "./cookie/cookie.component";
import {EllipsisPipe} from "../../../src/pipe/ellipsis.pipe";
import {ComponentEllipsisComponent} from "./ellipsis/ellipsis.component";
import {ComponentSwitchComponent} from "./switch/switch.component";
import {SwitchComponent} from "../../../src/switch/switch.component";
import {ComponentQrcodeComponent} from "./qrcode/qrcode.component";
import {QRCodeComponent} from "../../../src/qrcode/qrcode.component";
import {ComponentValidatorComponent} from "./validator/validator.component";
import {PhoneValidator} from "../../../src/validator/phone.directive";
import {PasswordValidator} from "../../../src/validator/password.directive";
import {PositiveIntegerValidator} from "../../../src/validator/positiveInteger.directive";
import {SameValidator} from "../../../src/validator/same.directive";
import {EmailValidator} from "../../../src/validator/email.directive";

@NgModule({
  imports:       [FormsModule, CommonModule, componentRouting],
  declarations: [
    ComponentComponent,
    ComponentNoticeComponent,
    ComponentLazyLoadComponent,
    ImageLazyLoad,
    ComponentCookieComponent,
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
    SameValidator ,
    EmailValidator,

  ]
})
export class ComponentModule { }

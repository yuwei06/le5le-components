import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ValidatorService } from './validator.service';
import { PhoneValidator } from './phone.directive';
import { PasswordValidator } from './password.directive';
import { PositiveValidator } from './positive.directive';
import { PositiveIntegerValidator } from './positiveInteger.directive';
import { SameValidator } from './same.directive';
import { EmailValidator } from './email.directive';
import { UrlValidator } from './url.directive';
import { MinValidator } from './min.directive';
import { RegExpValidator } from './regExp.directive';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    ValidatorService,
    PhoneValidator,
    PasswordValidator,
    PositiveValidator,
    PositiveIntegerValidator,
    SameValidator,
    EmailValidator,
    UrlValidator,
    MinValidator,
    RegExpValidator
  ],
  exports: [
    ValidatorService,
    PhoneValidator,
    PasswordValidator,
    PositiveValidator,
    PositiveIntegerValidator,
    SameValidator,
    EmailValidator,
    UrlValidator,
    MinValidator,
    RegExpValidator
  ]
})
export class ValidatorModule {}

import { Directive, Attribute, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import {isPhone} from './validator.service';

@Directive({
  selector: '' +
  '[is-phone][ngModel],' +
  '[is-phone][formControl],' +
  '',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => PhoneValidator),
    multi: true
  }]
})
export class PhoneValidator implements Validator {
  private val: string;

  constructor(@Attribute('is-phone') val: string) {
    this.val = val;
  }

  validate(c: AbstractControl): {[key: string]: any} {
    if (!isPhone(c.value, this.val)) {
      return {'phone': true};
    }
  }
}

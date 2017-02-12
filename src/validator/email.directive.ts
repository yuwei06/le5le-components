import { Directive, Attribute, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import {isEmail} from './validator.service';

@Directive({
  selector: '' +
  '[is-email][ngModel],' +
  '[is-email][formControl],' +
  '',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => EmailValidator),
    multi: true
  }]
})
export class EmailValidator implements Validator {
  private val: string;

  constructor(@Attribute('is-email') val: string) {
    this.val = val;
  }

  validate(c: AbstractControl): {[key: string]: any} {
    if (!isEmail(c.value, this.val)) {
      return {'email': true};
    }
  }
}

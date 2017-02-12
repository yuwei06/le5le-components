import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import {isPassword} from './validator.service';

@Directive({
  selector: '' +
  '[is-password][ngModel],' +
  '[is-password][formControl],' +
  '',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => PasswordValidator),
    multi: true
  }]
})
export class PasswordValidator implements Validator {
  validate(c: AbstractControl): {[key: string]: any} {
    if (!isPassword(c.value)) {
      return {'password': true};
    }
  }
}

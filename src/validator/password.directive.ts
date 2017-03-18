import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import {isPassword} from './validator.service';

@Directive({
  selector: '[isPassword]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordValidator,
    multi: true
  }]
})
export class PasswordValidator implements Validator {
  validate(c: AbstractControl): {[key: string]: any} {
    if (c.value && !isPassword(c.value)) {
      return {'password': true};
    }
  }
}

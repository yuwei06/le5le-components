import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import {isEmail} from './validator.service';

@Directive({
  selector:  '[isEmail]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailValidator,
    multi: true
  }]
})
export class EmailValidator implements Validator {
  constructor() {
  }

  validate(c: AbstractControl): {[key: string]: any} {
    if (c.value && !isEmail(c.value)) {
      return {'email': true};
    }
  }
}

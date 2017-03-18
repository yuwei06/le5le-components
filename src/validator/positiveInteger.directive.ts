import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import {isPositiveInteger} from './validator.service';

@Directive({
  selector: '[positiveInteger]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PositiveIntegerValidator,
    multi: true
  }]
})
export class PositiveIntegerValidator implements Validator {
  validate(c: AbstractControl): {[key: string]: any} {
    if (c.value && !isPositiveInteger(c.value)) {
      return {'positiveInteger': true};
    }
  }
}

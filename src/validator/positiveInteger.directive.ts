import { Directive, Attribute, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import {isPositiveInteger} from './validator.service';

@Directive({
  selector: '' +
  '[is-positive-integer][ngModel],' +
  '[is-positive-integer][formControl],' +
  '',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => PositiveIntegerValidator),
    multi: true
  }]
})
export class PositiveIntegerValidator implements Validator {
  validate(c: AbstractControl): {[key: string]: any} {
    if (!isPositiveInteger(c.value)) {
      return {'positiveInteger': true};
    }
  }
}

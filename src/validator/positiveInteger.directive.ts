import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { ValidatorService } from './validator.service';

@Directive({
  selector: '[positiveInteger]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PositiveIntegerValidator,
    multi: true
  }, ValidatorService]
})
export class PositiveIntegerValidator implements Validator {
  constructor(private _service: ValidatorService) {
  }

  validate(c: AbstractControl): {[key: string]: any} {
    if (c.value && !this._service.isPositiveInteger(c.value)) {
      return {'positiveInteger': true};
    }
  }
}

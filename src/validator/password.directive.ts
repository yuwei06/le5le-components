import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { ValidatorService } from './validator.service';

@Directive({
  selector: '[isPassword]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordValidator,
    multi: true
  }, ValidatorService]
})
export class PasswordValidator implements Validator {
  constructor(private _service: ValidatorService) {
  }

  validate(c: AbstractControl): {[key: string]: any} {
    if (c.value && !this._service.isPassword(c.value)) {
      return {'password': true};
    }
  }
}

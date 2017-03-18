import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import {isPhone} from './validator.service';

@Directive({
  selector: '[isPhone]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PhoneValidator,
    multi: true
  }]
})
export class PhoneValidator implements Validator {
  @Input('isPhone') local: string = 'zh-CN';
  validate(c: AbstractControl): {[key: string]: any} {
    if (c.value && !isPhone(c.value, this.local)) {
      return {'phone': true};
    }
  }
}

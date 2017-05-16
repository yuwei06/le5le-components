import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import {isUrl} from './validator.service';

@Directive({
  selector: '[isUrl]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: UrlValidator,
    multi: true
  }]
})
export class UrlValidator implements Validator {
  constructor() {
  }

  validate(c: AbstractControl): {[key: string]: any} {
    if (c.value && !isUrl(c.value)) {
      return {'url': true};
    }
  }
}

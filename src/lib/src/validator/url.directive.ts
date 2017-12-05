import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { ValidatorService } from './validator.service';

@Directive({
  selector: '[isUrl]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UrlValidator,
      multi: true
    },
    ValidatorService
  ]
})
export class UrlValidator implements Validator {
  constructor(private _service: ValidatorService) {
  }

  validate(c: AbstractControl): {[key: string]: any} {
    if (c.value && !this._service.isUrl(c.value)) {
      return {'url': true};
    }
  }
}

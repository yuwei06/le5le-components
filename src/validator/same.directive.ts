import { Directive, Attribute, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '' +
  '[is-same][ngModel],' +
  '[is-same][formControl],' +
  '',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => SameValidator),
    multi: true
  }]
})
export class SameValidator implements Validator {
  @Input('is-same') val: string;
  constructor() {
  }

  validate(c: AbstractControl): {[key: string]: any} {
    if (c.value != this.val) {
      return {'same': true};
    }
  }
}

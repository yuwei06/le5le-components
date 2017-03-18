import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[sameTo]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: SameValidator,
    multi: true
  }]
})
export class SameValidator implements Validator {
  @Input('sameTo') val: string;

  validate(c: AbstractControl): {[key: string]: any} {
    if (c.value != this.val) {
      return {'same': true};
    }
  }
}

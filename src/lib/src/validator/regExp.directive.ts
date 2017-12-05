import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[repExp]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: RepExpValidator,
    multi: true
  }]
})
export class RepExpValidator implements Validator {
  @Input('repExp') val: string;

  validate(c: AbstractControl): {[key: string]: any} {
    let pat = new RegExp(this.val);
    if (!pat.test(c.value)) {
      return {'repExp': true};
    }
  }
}

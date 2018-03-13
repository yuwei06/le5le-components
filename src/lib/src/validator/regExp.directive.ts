import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[regExp]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: RegExpValidator,
    multi: true
  }]
})
export class RegExpValidator implements Validator {
  @Input('regExp') val: string;

  validate(c: AbstractControl): { [key: string]: any } {
    let pat = new RegExp(this.val);
    if (c.value && !pat.test(c.value)) {
      return { 'repExp': true };
    }
  }
}

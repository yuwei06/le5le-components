import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[regExp]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: RegExpValidator,
      multi: true
    }
  ]
})
export class RegExpValidator implements Validator {
  @Input() regExp: string;

  validate(c: AbstractControl): { [key: string]: any } {
    let pat = new RegExp(this.regExp);
    if (c.value && !pat.test(c.value)) {
      return { repExp: true };
    }
  }
}

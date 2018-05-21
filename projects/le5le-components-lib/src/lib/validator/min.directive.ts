import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[uiMin]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MinValidator,
      multi: true
    }
  ]
})
export class MinValidator implements Validator {
  @Input('min') min: number;

  validate(c: AbstractControl): { [key: string]: any } {
    if (+c.value < this.min) {
      return { min: true };
    }
  }
}

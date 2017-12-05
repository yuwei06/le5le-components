import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[min]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MinValidator,
    multi: true
  }]
})
export class MinValidator implements Validator {
  @Input('min') val: number;

  validate(c: AbstractControl): {[key: string]: any} {
    if (+c.value < this.val) {
      return {'min': true};
    }
  }
}

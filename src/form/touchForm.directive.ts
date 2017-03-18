import { Directive, Input, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  selector: '[touchForm]',
})
export class TouchFormDirective {
  @Input() touchForm: NgForm;
  constructor() {
  }

  @HostListener('submit') onSubmit() {
    for (let i in this.touchForm.controls) {
      this.touchForm.controls[i].markAsTouched();
    }
  }

}

import { Directive, Input, HostListener, Renderer, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  selector: '[touchForm]',
})
export class TouchFormDirective {
  @Input() touchForm: NgForm;
  constructor(private elementRef: ElementRef, private renderer: Renderer) {
  }

  @HostListener('submit') onSubmit() {
    for (let i in this.touchForm.controls) {
      this.touchForm.controls[i].markAsTouched();
    }

    this.renderer.setElementClass(this.elementRef.nativeElement, 'form-untouched', false);
  }

}

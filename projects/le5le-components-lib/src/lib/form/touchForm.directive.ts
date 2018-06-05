import {
  Directive,
  Input,
  HostListener,
  Renderer,
  ElementRef
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  selector: '[uiTouchForm]'
})
export class TouchFormDirective {
  @Input() uiTouchForm: NgForm;
  constructor(private elementRef: ElementRef, private renderer: Renderer) {}

  @HostListener('submit')
  onSubmit() {
    // tslint:disable-next-line:forin
    for (const i in this.uiTouchForm.controls) {
      this.uiTouchForm.controls[i].markAsTouched();
    }

    const elem = this.elementRef.nativeElement.querySelector(
      '.ng-invalid.ng-touched'
    );

    if (elem) {
      const parentElem =
        this.elementRef.nativeElement.querySelector('.js-scroll') ||
        this.elementRef.nativeElement;
      parentElem.scrollTop = elem.offsetTop;
    }

    this.renderer.setElementClass(
      this.elementRef.nativeElement,
      'submited',
      true
    );
  }
}

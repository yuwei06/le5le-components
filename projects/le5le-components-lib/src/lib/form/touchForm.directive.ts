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
  @Input() scrollSelector = '';
  @Input() scrollTop = -10;
  constructor(private elementRef: ElementRef, private renderer: Renderer) {}

  @HostListener('submit')
  onSubmit() {
    // tslint:disable-next-line:forin
    for (const i in this.uiTouchForm.controls) {
      this.uiTouchForm.controls[i].markAsTouched();
    }

    let elem = this.elementRef.nativeElement.querySelector('.ng-invalid');

    if (elem) {
      const scrollElem =
        this.elementRef.nativeElement.querySelector('.js-scroll') ||
        document.querySelector(this.scrollSelector) ||
        this.elementRef.nativeElement;

      let top = elem.offsetTop;
      while (elem.offsetParent) {
        elem = elem.offsetParent;
        if (scrollElem !== elem && scrollElem.contains(elem)) {
          top += elem.offsetTop;
        } else {
          break;
        }
      }
      scrollElem.scrollTop = top + this.scrollTop;
    }

    this.renderer.setElementClass(
      this.elementRef.nativeElement,
      'submited',
      true
    );
  }
}

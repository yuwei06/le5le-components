import { Directive, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

@Directive({
  selector: '[divMove]',
})
export class DivMoveDirective {
  @Input() divMove: boolean = true;
  @Input() isHead: boolean = false;
  nativeElement: any;
  mouseDown$: any;
  mouseMove$: any;
  mouseUp$: any;
  sub$: any;
  constructor(private element:ElementRef) {
  }

  ngOnInit () {
   this.nativeElement = this.element.nativeElement;
   if (this.isHead) this.nativeElement = this.nativeElement.parentElement;

    this.mouseDown$ = Observable.fromEvent(this.element.nativeElement, 'mousedown');
    this.mouseMove$ = Observable.fromEvent(document, 'mousemove');
    this.mouseUp$ = Observable.fromEvent(document, 'mouseup');

    this.sub$ = this.mouseDown$.map((event) => ({
      pos: this.getPos(this.nativeElement),
      event,
    })).switchMap((initialState) => {
      const initialPos = initialState.pos;
      const { clientX, clientY } = initialState.event;
      return this.mouseMove$.map((moveEvent) => ({
        x: moveEvent.clientX - clientX + initialPos.x,
        y: moveEvent.clientY - clientY + initialPos.y,
      })).takeUntil(this.mouseUp$);
    }).subscribe((pos) => {
      this.setPos(this.nativeElement, pos)
    });
  }

  getPos(nativeElement: any): any {
    const style = getComputedStyle(nativeElement);
    const regExp = /matrix\((\d+,\s){4}([-]*\d+),\s([-]*\d+)/i;
    const result = style.transform.match(regExp);
    if (result) {
      return {
        x: parseInt(result[2], 10),
        y: parseInt(result[3], 10)
      }
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }

  setPos(nativeElement: any, pos: any) {
    nativeElement.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
  }

  ngOnDestroy() {
    if (this.sub$) this.sub$.unsubscribe();
  }
}

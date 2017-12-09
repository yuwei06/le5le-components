import { Directive, Input, Renderer, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';


@Directive({
  selector: '[imageLazyLoad]'
})
export class ImageLazyLoad {
  @Input('imageLazyLoad') url: string = '';
  @Input('imageLazyLoadParams') params: string = '';
  @Input() threshold: number = 0;
  private scrollSubscription: Subscription;
  constructor(private el: ElementRef, private renderer: Renderer) {
    let scrollStream = Observable.fromEvent(window, 'scroll').debounceTime(100);
    this.scrollSubscription = scrollStream.subscribe(() => {
      this.loadInView();
    });
  }

  ngOnInit() {
    this.loadInView();
  }

  loadInView(): void {
    let ePos = this.getPosition();
    if (ePos.bottom > 0 && (ePos.bottom >= (window.pageYOffset - this.threshold))
      && (ePos.top <= ((window.pageYOffset + window.innerHeight) + this.threshold))) {
      this.setImage();
    }
  }

  getPosition() {
    let box = this.el.nativeElement.getBoundingClientRect();
    let top = box.top + (window.pageYOffset - document.documentElement.clientTop);
    return {
      top: top,
      left: box.left + (window.pageXOffset - document.documentElement.clientLeft),
      bottom: top + this.el.nativeElement.clientHeight
    };
  }

  setImage() {
    this.scrollSubscription.unsubscribe();
    this.scrollSubscription = null;
    this.renderer.setElementAttribute(this.el.nativeElement, 'src', this.url + this.params);
  }
}

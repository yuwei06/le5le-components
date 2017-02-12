import {
  Component,
  Input,
  ElementRef,
  OnInit
} from '@angular/core';

import {QrCode} from './';

@Component({
  selector: 'qr-code',
  template: ''
})
export class QRCodeComponent implements OnInit {
  @Input() data: string = '';
  @Input() size: number = 128;
  @Input() type: number = 4;
  @Input() level: string = 'M';
  private qr: QrCode;
  constructor(
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.qr = new QrCode(this.type, this.level);
    this.qr.addData(this.data);
    this.qr.make();

    let imgTagString: string = this.qr.createImgTag(this.type, 0);
    let el: HTMLElement = this.elementRef.nativeElement;
    el.innerHTML = imgTagString;
    let imgTagObject: HTMLImageElement = <HTMLImageElement> el.firstElementChild;
    imgTagObject.width = this.size;
    imgTagObject.height = this.size;
  }
}

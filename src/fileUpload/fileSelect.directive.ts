import { Directive, ElementRef, HostListener, Input } from '@angular/core';

import {FileUploader} from './fileUploader';

@Directive({
  selector: '[file-select]',
})
export class FileSelectDirective {
  @Input() uploader: FileUploader;
  constructor(private element:ElementRef) {
  }

  @HostListener('change')
  onChange() {
    this.uploader.addFiles(this.element.nativeElement.files);
  }
}

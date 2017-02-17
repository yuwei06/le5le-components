import { Component, Input, Output, EventEmitter} from '@angular/core';

import {FileUploader} from './fileUploader';
import {NoticeService} from "../notice/notice.service";

@Component({
  selector: 'ui-file-upload',
  template: `
    <span *ngFor="let item of urls; let i = index" class="ui-file-upload border" >
      <img [src]="item" />
      <i class="iconfont icon-close" (click)="del(i)"></i>
    </span>
    <span class="ui-file-upload box dash" *ngIf="urls.length < options.maxCount">
      <div class="content"> <i class="iconfont icon-add font-2x"></i> </div>
      <input type="file" file-select [uploader]="uploader" />
    </span>
  `
})
export class FileUploadComponent {
  @Input() urls: string[] = [];
  @Output() urlsChange = new EventEmitter<any>();
  @Input() options: any = {};
  uploader: FileUploader;
  constructor(private _noticeService: NoticeService) {
  }

  ngOnInit() {
    if (!this.options.maxCount) this.options.maxCount = 999;
    this.uploader = new FileUploader({
      url: this.options.url,
      headers: this.options.headers,
      autoUpload: true
    });

    this.uploader.emitter.subscribe( ret => {
      if (ret.event === 'error') {
        this._noticeService.notice({theme: 'error', body: ret.fileItem.error});

        // mock
        this.urls.push('/assets/img/user.jpg');
        this.urlsChange.emit(this.urls);
      }
      else if (ret.event === 'success') {
        this.urls.push(ret.fileItem.url);
        this.urlsChange.emit(this.urls);
      }
    });
  }

  del(index: number) {
    this.urls.splice(index, 1);
    this.urlsChange.emit(this.urls);
  }
}

require('./fileUpload.css');

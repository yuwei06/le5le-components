import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FileUploader } from './fileUploader';
import { NoticeService } from "../notice/notice.service";
import { UploadParam } from './fileUpload.model';

@Component({
  selector: 'ui-image-upload',
  template: `
    <span *ngFor="let item of urls; let i = index" class="ui-image-upload" >
      <img [src]="item" />
      <i class="iconfont icon-close" (click)="del(i)"></i>
    </span>
    <span class="ui-image-upload box dash" *ngIf="urls.length < options.maxCount">
      <div class="content"> <i class="iconfont icon-add font-2x"></i> </div>
      <input type="file" file-select [uploader]="uploader" [accept]="options.accept" [multiple]="options.maxCount>1" />
    </span>
  `
})
export class ImageUploadComponent {
  @Input() urls: string[] = [];
  @Output() urlsChange = new EventEmitter<any>();
  @Input() files: any[] = [];
  @Output() filesChange = new EventEmitter<any>();
  @Input() completed: boolean = false;
  @Output() completedChange = new EventEmitter<boolean>();
  @Input() options: any = {};
  uploader: FileUploader;
  constructor(private _noticeService: NoticeService) {
  }

  ngOnInit() {
    if (!this.options.maxCount) this.options.maxCount = 1;
    if (!this.options.accept) this.options.accept = 'image/gif, image/jpeg, image/png, image/svg';
    if (!this.options.cdn) this.options.cdn = '';
    let params: UploadParam = new UploadParam(
      <string>this.options.url,
      this.options.headers,
      <boolean>this.options.autoUpload
    );
    this.uploader = new FileUploader(params);

    this.uploader.emitter.subscribe( ret => {
      if (ret.event === 'error') {
        this._noticeService.notice({theme: 'error', body: ret.fileItem.error});

        this.urlsChange.emit(this.urls);
      }
      else if (ret.event === 'ready') {
        let urls = [];
        let files = [];
        for (let item of this.uploader.fileList) {
          urls.push(item.url);
          files.push(item.file);
        }
        this.urls = urls;
        this.urlsChange.emit(urls);
        this.files = files;
        this.filesChange.emit(files);
      }
      else if (ret.event === 'completeAll') {
        let urls = [];
        for (let item of this.uploader.fileList) {
          urls.push(this.options.cdn + item.url);
        }
        this.urls = urls;
        this.urlsChange.emit(urls);
        this.completed = true;
        this.completedChange.emit(true);
      }
    });
  }

  del(index: number) {
    this.uploader.fileList.splice(index, 1);
    this.urls.splice(index, 1);
    this.urlsChange.emit(this.urls);
  }
}

require('./fileUpload.pcss');

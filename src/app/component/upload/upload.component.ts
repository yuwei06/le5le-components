import { Component } from '@angular/core';

@Component({
  selector: 'app-component-upload',
  templateUrl: 'upload.component.html',
  providers: [],
  styleUrls: ['./upload.component.scss']
})
export class ComponentUploadComponent {
  upOptions: any = {
    url: 'http://fe-support.dev.cloudtogo.cn/api/file/upload',
    headers: { Authorization: '' },
    autoUpload: true,
    maxCount: 1,
    maxLength: 1024 * 1024,
    cdn: 'http://fe-support.dev.cloudtogo.cn'
  };
  constructor() {}

  onUrlsChanged(data) {
    console.log('upload', data);
  }
}

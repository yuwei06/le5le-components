import {Component} from '@angular/core';
import {FileUploader} from "../../../../src/fileUpload/fileUploader";

@Component({
  selector: 'component-file-upload',
  templateUrl: "fileUpload.component.html"
})
export class ComponentFileUploadComponent {
  uploader: FileUploader;
  fileUploadStatus: any = {};
  constructor() {
  }

  ngOnInit() {
    this.uploader = new FileUploader({
      url: '/api/file/upload?id=',
      headers: {
        Authorization: ''
      },
      autoUpload: true
    });

    this.uploader.emitter.subscribe( ret => {
      this.fileUploadStatus = ret.fileItem;
    });
  }
}

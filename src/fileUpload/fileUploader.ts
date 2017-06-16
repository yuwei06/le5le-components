import {Injectable, EventEmitter} from '@angular/core';
import { FileItem, FileStatus, UploadParam } from './fileUpload.model';

@Injectable()
export class FileUploader {
  fileList: FileItem[] = [];
  emitter: EventEmitter<any> = new EventEmitter(true);
  constructor(public params: UploadParam) {
  }

  addFiles(files: any[]) {
    for (let file of files) {
      let fileItem = new FileItem(file);
      if (this._isValidFile(fileItem)) {
        let reader = new FileReader();
        reader.onload = () => {
          fileItem.url = reader.result;
          this._onMessage('ready', fileItem);
        };
        reader.readAsDataURL(file);
        this.fileList.push(fileItem);
      }
    }

    if (this.params.autoUpload) this.uploadAll();
  }

  uploadAll() {
    let items = this.fileList.filter(item => (item.status === FileStatus.Ready));
    if (!items.length) return;

    this.uploadFile(items[0]);
  }

  private _isValidFile(item: FileItem): boolean {
    if (item.file.size > this.params.maxLength) {
      item.status = FileStatus.Fail;
      item.error = "文件大小不能超过" + this.params.maxLength/1024/1024 + "M";
      return false;
    }

    return true;
  }

  private uploadFile(fileItem: FileItem): void {
    fileItem.status = FileStatus.Uploading;

    let xhr = new XMLHttpRequest();
    let form = new FormData();
    form.append(this.params.field, fileItem.file, fileItem.file.name);

    xhr.upload.onprogress = (event) => {
      fileItem.progress = Math.round(event.lengthComputable? event.loaded * 100 / event.total : 0);
      this._onMessage('progress', fileItem);
    };

    xhr.upload.onabort = (e) => {
      fileItem.status = FileStatus.Cancel;
      this._onMessage('cancel', fileItem);
      this._onNext();
    };

    xhr.upload.onerror = (e) => {
      fileItem.error = "文件上传错误";
      this._onMessage('error', fileItem);
      this._onNext();
    };

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        fileItem.status = FileStatus.Success;
        try {
          if (xhr.status == 404) {
            fileItem.error = "文件上传错误：404" ;
            this._onMessage('error', fileItem);
          }
          else {
            let response = JSON.parse(xhr.responseText);
            if (xhr.status == 200) {
              if (response && response.error) {
                fileItem.error = "文件上传错误："  + response.error;
                this._onMessage('error', fileItem);
              } else {
                fileItem.url =  response.url;
                this._onMessage('complete', fileItem);
              }
            } else {
              if (response && response.error) fileItem.error = "文件上传错误："  + response.error;
              this._onMessage('error', fileItem);
            }
          }
          this._onNext();
        } catch (e) {
          fileItem.error = "文件上传错误：返回结果不是一个json" ;
          this._onMessage('error', fileItem);
        }
      }
    };

    xhr.open("POST", this.params.url, true);
    if (this.params.withCredentials) xhr.withCredentials = true;

    if (this.params.headers) {
      Object.keys(this.params.headers).forEach((key) => {
        xhr.setRequestHeader(key, this.params.headers[key]);
      });
    }
    xhr.send(form);
  }

  private _onNext() {
    let items = this.fileList.filter(item => (item.status === FileStatus.Ready));
    if (!items.length) return this._onMessage('completeAll', null);

    this.uploadFile(items[0]);
  }

  private _onMessage(event: string, fileItem: FileItem) {
    this.emitter.emit({
      event: event,
      fileItem: fileItem
    });
  }
}

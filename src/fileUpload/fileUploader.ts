import {Injectable, EventEmitter} from '@angular/core';
import {FileItem} from './fileItem.model';

@Injectable()
export class FileUploader {
  public isUploading:boolean = false;
  public queue:Array<any> = [];
  public progress:number = 0;
  public maxLength:number = 2048*1024;
  public filters:Array<any> = [];
  public fieldName:string = 'file';
  public emitter: EventEmitter<any> = new EventEmitter(true);
  constructor(public options:any) {
    this.filters.unshift({name: 'maxLength', fn: this._maxLengthFilter});
  }

  public addToQueue(files:any[]) {
    if (!this.options.multi) {
      this.queue = [];
    }

    let list:any[] = [];
    for (let file of files) {
      let fileItem = new FileItem(file);
      if (this._isValidFile(fileItem)) {
        fileItem.isReady = this.options.autoUpload;
        this.queue.push(fileItem);
      }
    }

    this.progress = this._getTotalProgress();

    if (this.options.autoUpload) {
      this.uploadAll();
    }
  }

  public uploadAll() {
    let items = this.getReadyItems().filter(item => !item.isUploading);
    if (!items.length) {
      return;
    }

    this.uploadFile(items[0]);
  }

  public getIndexOfItem(value:any) {
    return typeof value === 'number' ? value : this.queue.indexOf(value);
  }

  public getReadyItems() {
    return this.queue.filter(item => (item.isReady && !item.error && !item.isUploading));
  }

  private _getTotalProgress(value = 0) {
    let notUploaded = this.getReadyItems().length;
    let uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
    let ratio = 100 / this.queue.length;
    let current = value * ratio / 100;

    return Math.round(uploaded * ratio + current);
  }

  private _maxLengthFilter(item:any): boolean {
    if (item.file.size > this.maxLength) {
      item.error = "文件大小不能超过" + this.maxLength/1024/1024 + "M";
      this.emitter.emit({
        event: 'filterError',
        fileItem: item
      });
      return false;
    }

    return true;
  }

  private _isValidFile(item:any): boolean {
    return this.filters.every((filter:any) => {
      return filter.fn.call(this, item);
    });
  }

  private uploadFile(file: any): void {
    this.isUploading = true;

    let xhr = new XMLHttpRequest();
    let form = new FormData();
    form.append(this.fieldName, file.file, file.file.name);

    xhr.upload.onprogress = (event) => {
      file.progress = Math.round(event.lengthComputable? event.loaded * 100 / event.total : 0);
      this._onProgressItem(file);
    };

    xhr.upload.onabort = (e) => {
      file.isCancel = true;
      this._onCompleteItem(file);
    };

    xhr.upload.onerror = (e) => {
      file.error = "文件上传错误";
      this._onError(file);
      this._onCompleteItem(file);
    };

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        file.isReady = false;
        file.isUploading = false;
        try {
          if (xhr.status == 404) {
            file.error = "文件上传错误：404" ;
            this._onError(file);
          }
          else {
            let response = JSON.parse(xhr.responseText);
            if (xhr.status == 200) {
              if (response && response.error) {
                file.error = "文件上传错误："  + response.error;
                this._onError(file);
              } else {
                file.url =  response.url;
                this._onSuccessItem(file);
              }
            } else {
              if (response && response.error) file.error = "文件上传错误："  + response.error;
              this._onError(file);
            }
            this._onCompleteItem(file);
          }
        } catch (e) {
          file.error = "文件上传错误：返回结果不是一个json" ;
          this._onError(file);
        }
      }
    };

    xhr.open("POST", this.options.url, true);
    if (this.options.withCredentials) xhr.withCredentials = true;

    if (this.options.headers) {
      Object.keys(this.options.headers).forEach((key) => {
        xhr.setRequestHeader(key, this.options.headers[key]);
      });
    }

    file.isUploading = true;
    xhr.send(form);
  }

  private _onCompleteItem(item:any) {
    item.isUploading = false;
    let nextItem = this.getReadyItems()[0];
    this.isUploading = false;
    this.progress = this._getTotalProgress();

    if (nextItem) {
      this.uploadFile(nextItem);
      return;
    }

    this._onCompleteAll();
  }

  private _onProgressItem(fileItem:any) {
    this.emitter.emit({
      event: 'progress',
      fileItem: fileItem
    });
  }

  private _onError(fileItem:any) {
    this.emitter.emit({
      event: 'error',
      fileItem: fileItem
    });
  }

  private _onSuccessItem(fileItem:any) {
    this.emitter.emit({
      event: 'success',
      fileItem: fileItem
    });
  }

  private _onCompleteAll() {
    this.emitter.emit({
      event: 'completeAll'
    });
  }
}

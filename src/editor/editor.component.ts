import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';

import { toolbarItems } from "./config";
import { FileUploader } from "../fileUpload/fileUploader";
import { NoticeService } from "../notice/notice.service";
import { UploadParam } from '../fileUpload/fileUpload.model';

@Component({
  selector: 'ui-editor',
  templateUrl: "editor.component.html"
})
export class EditorComponent implements OnInit, OnChanges {
  @Input() content: string = '';
  @Output() contentChange = new EventEmitter<any>();
  @Input() title: string = '';
  @Output() titleChange = new EventEmitter<any>();
  @Input() abstract: string = '';
  @Output() abstractChange = new EventEmitter<any>();
  @Input() images: string[] = [];
  @Output() imagesChange = new EventEmitter<any>();
  @Input() options: any = {
    templates: [],
    canEditTemplates: false,
    url: '',
    headers: {},
    toolbarItems: toolbarItems
  };
  @Output("selectTemplate") selectTemplateChange: EventEmitter<any> = new EventEmitter<any>();
  @Output("editTemplate") editTemplateChange: EventEmitter<any> = new EventEmitter<any>();
  @Output("deleteTemplate") deleteTemplateChange: EventEmitter<any> = new EventEmitter<any>();
  editor: HTMLElement;
  editable: boolean = true;
  private timer: any;
  private uploader:FileUploader;
  filename: string;
  progress: number;
  link: any = {show: false, text: '', href: '', blank: true};
  img: any = {show: false, src: ''};
  private selectedRange: any;
  constructor(private _noticeService: NoticeService) {
    if (!this.options.toolbarItems || !this.options.toolbarItems.length) this.options.toolbarItems = toolbarItems;

    let params: UploadParam = new UploadParam(this.options.url, this.options.headers, true);
    this.uploader = new FileUploader(params);
    this.uploader.emitter.subscribe((ret: any) => {
      switch (ret.event) {
        case 'progress':
          this.filename = ret.fileItem.file.name;
          this.progress = ret.fileItem.progress;
          break;
        case 'success':
          if (!this.images) this.images = [];
          this.images.push(ret.fileItem.url);
          this.imagesChange.emit(this.images);
          document.execCommand('insertImage', false, ret.fileItem.url + '?w=450&h=300');
          this.progress = 0;
          break;
        case 'error':
        case 'filterError':
          this.progress = 0;
          this._noticeService.notice({theme: 'error', body: '上传图片' + ret.fileItem.file.name + '失败：' + ret.fileItem.error});
          break;
      }
    });
  }

  ngOnInit () {
    this.editor = document.querySelector('.ui-editor .editor .article') as HTMLElement;
    if (this.content) {
      this.editor.innerHTML = this.content;
    }
  }

  ngOnChanges(changes: any) {
    if (this.editor && changes.content && changes.content.currentValue != changes.content.previousValue) {
      this.onContentEdit();
    }
  }

  getSelectRange(): any {
    if (!window.getSelection()) return null;
    this.selectedRange = window.getSelection().getRangeAt(0);

    return this.selectedRange;
  }

  command (event:any, cmd: string, val: string) {
    event.stopPropagation();

    switch (cmd) {
      case 'formatBlock':
        // 如果已经是blockquote，则取消。
        let select = window.getSelection();
        if (!select) return;
        if (select.focusNode && select.focusNode.parentNode && select.focusNode.parentNode.nodeName
          && select.focusNode.parentNode.nodeName.toLowerCase() === 'blockquote') {
          val = 'div'
        }
        break;
      case 'createLink':
        if (this.getSelectRange()) this.link.show = true;
        return;
      case 'insertImage':
        if (this.getSelectRange()) this.img.show = true;
        return;
      case 'localImage':
        return;
      case 'remoteImage':
        return;
      case 'html':
        this.editable =  !this.editable;
        this.getContent();
        this.getTitle();
        this.getAbstract();
        return;
      case 'templates':
        return;
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    document.execCommand(cmd, false, val)
  }

  onAddLink () {
    if (!this.link.href || !this.selectedRange) return;

    this.link.show = false;

    let node = document.createElement('A');
    node.innerHTML = this.link.text || this.link.href;
    node.setAttribute('href', this.link.href);
    if (this.link.blank) node.setAttribute('target', '_blank');
    this.selectedRange.deleteContents();
    this.selectedRange.insertNode(node);
    this.link.text = this.link.href = '';
  }

  onAddImage () {
    if (!this.img.src || !this.selectedRange) return;

    this.img.show = false;

    let node = document.createElement('IMG');
    node.setAttribute('src', this.img.src);
    this.selectedRange.deleteContents();
    this.selectedRange.insertNode(node);
    this.img.src = '';

    this.images.push(this.img.src);
    this.imagesChange.emit(this.images);
  }

  getContent(): string {
    this.content = this.editor.innerHTML;
    this.contentChange.emit(this.content);
    return this.content;
  }

  onContentEdit () {
    this.editor.innerHTML = this.content;
    this.getTitle();
    this.getAbstract();
  }

  getTitle (): string {
    for (let i = 0; i < this.editor.childNodes.length; i++) {
      if (this.editor.childNodes[i].nodeName && this.editor.childNodes[i].nodeName.toLowerCase() == "h1") {
        this.title = (this.editor.childNodes[i] as HTMLElement).innerHTML;
        this.titleChange.emit(this.title);
        break;
      }
    }

    return this.title;
  }

  setTitle (data: string) {
    if (!data || data == 'undefined') return;

    let i: number = 0;
    for (; i < this.editor.childNodes.length; i++) {
      if (this.editor.childNodes[i].nodeName && this.editor.childNodes[i].nodeName.toLowerCase() == "h1") {
        (this.editor.childNodes[i] as HTMLElement).innerHTML = data;
        this.title = data;
        break;
      }
    }

    if (i >= this.editor.childNodes.length) {
      let e = document.createElement("h1");
      e.innerHTML = data;
      if (this.editor.childNodes.length) {
        this.editor.insertBefore(e, this.editor.childNodes[0]);
      } else {
        this.editor.appendChild(e);
      }
      this.title = data;
    }
  }

  getAbstract (): string {
    for (let i = 0; i < this.editor.childNodes.length; i++) {
      if ((this.editor.childNodes[i] as HTMLElement).className == "abstract") {
        this.abstract = (this.editor.childNodes[i] as HTMLElement).innerHTML;
        this.abstractChange.emit(this.abstract);
        break;
      }
    }

    return this.abstract;
  }

  setAbstract (data: string) {
    if (!data || data == 'undefined') return;

    let i: number = 0;
    for (; i < this.editor.childNodes.length; i++) {
      if ((this.editor.childNodes[i] as HTMLElement).className == "abstract") {
        (this.editor.childNodes[i] as HTMLElement).innerHTML = data;
        this.abstract = data;
        break;
      }
    }

    if (i >= this.editor.childNodes.length) {
      let e = document.createElement("div");
      e.innerHTML = data;
      e.className = 'abstract';
      if (this.editor.childNodes.length) {
        if (this.editor.childNodes[0].nodeName && this.editor.childNodes[0].nodeName.toLowerCase() == 'h1') {
          if (this.editor.childNodes.length > 1) {
            this.editor.insertBefore(document.createElement("br"), this.editor.childNodes[1]);
            this.editor.insertBefore(e, this.editor.childNodes[1]);
          } else {
            this.editor.appendChild(e);
            this.editor.appendChild(document.createElement("br"));
          }
        } else {
          this.editor.insertBefore(document.createElement("br"), this.editor.childNodes[0]);
          this.editor.insertBefore(e, this.editor.childNodes[0]);
        }
      } else {
        this.editor.appendChild(e);
        this.editor.appendChild(document.createElement("br"));
      }
      this.abstract = data;
    }
  }

  selectTemplate(template: any) {
    this.selectTemplateChange.emit(template);
  }

  editTemplate (template: any, event: any) {
    event.stopPropagation();

    this.editTemplateChange.emit(template);
  }

  delTemplate (template: any, event: any) {
    event.stopPropagation();

    this.deleteTemplateChange.emit(template);
  }

  onBlur () {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.timer = setTimeout(()=>{
      this.timer = null;
      this.getContent();
      this.getTitle();
      this.getAbstract();
    }, 300);
  }
}


require("./editor.pcss");

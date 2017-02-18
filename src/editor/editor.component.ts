import {Component, Input, Output, EventEmitter, OnChanges, OnInit} from '@angular/core';

import {EditorToolbarItem, toolbarItems, URL} from "./config";
import {FileUploader} from "../fileUpload/fileUploader";

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
  @Input() templates: any[] = [];
  @Input() requestHeaders: any = {};
  @Input() toolbarItems: EditorToolbarItem[];
  @Output("selectTemplate") selectTemplateChange: EventEmitter<any> = new EventEmitter<any>();
  @Output("editTemplate") editTemplateChange: EventEmitter<any> = new EventEmitter<any>();
  @Output("deleteTemplate") deleteTemplateChange: EventEmitter<any> = new EventEmitter<any>();
  editor: HTMLElement;
  editable: boolean = true;
  private timer: any;
  private uploader:FileUploader;
  public filename: string;
  public progress: number;
  public error: string;
  constructor() {
    if (!this.toolbarItems || !this.toolbarItems.length) this.toolbarItems = toolbarItems;

    this.uploader = new FileUploader({
      url: URL,
      headers: this.requestHeaders,
      autoUpload: true
    });

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
          this.filename = ret.fileItem.file.name;
          this.error = ret.fileItem.error;
          break;
        case 'filterError':
          this.error = ret.fileItem.error;
          this.progress = 0;
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

  command (event:any, cmd: string, val: string) {
    event.stopPropagation();

    switch (cmd) {
      case 'formatBlock':
        // 如果已经是blockquote，则取消。
        if (window.getSelection() && window.getSelection().focusNode
          && window.getSelection().focusNode.parentNode && window.getSelection().focusNode.parentNode.nodeName
          && window.getSelection().focusNode.parentNode.nodeName.toLowerCase() !== 'div') {
          val = 'div'
        }
        break;
      case 'createLink':
        val = prompt('请输入链接URL');
        if (!val) return;
        break;
      case 'insertImage':
        val = prompt('请输入图片URL');
        if (!val) return;

        this.images.push(val);
        this.imagesChange.emit(this.images);
        break;
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
        this.title = this.editor.childNodes[i].innerHTML;
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
        this.editor.childNodes[i].innerHTML = data;
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
      if (this.editor.childNodes[i].className == "abstract") {
        this.abstract = this.editor.childNodes[i].innerHTML;
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
      if (this.editor.childNodes[i].className == "abstract") {
        this.editor.childNodes[i].innerHTML = data;
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
}


require("./editor.css");

import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'ui-timepicker',
  template: `
    <div class="ui-timepicker" *ngIf="loaded" (click)="onShow($event)" >
      <div class="flex middle input" [class.readonly]="readonly">
        <span *ngIf="!options.hideTime" class="full">{{time | date:'yyyy-MM-dd HH:mm:ss'}}</span>
        <span *ngIf="options.hideTime && !options.mobile" class="full">{{time | date:'yyyy-MM-dd'}}</span>
        <span *ngIf="options.hideTime && options.mobile" class="full">{{getDateStr()}}</span>
        <i *ngIf="!readonly" class="iconfont icon-triangle-down"></i>
      </div>
      <div class="dropdown" [class.block]="!readonly && showDropdown">
        <ui-calendar [(date)]="dateTime" (dateChange)="onChange()" [options]="opts" [readonly]="readonly"  class="block"></ui-calendar>
        <ui-time *ngIf="!options.hideTime" [(date)]="timeTime" (dateChange)="onChange()" [options]="opts" [readonly]="readonly"  class="block"></ui-time>
        <div class="p15">
          <button type="button" class="button success full" (click)="onShow($event, true)">确定</button>
        </div>
      </div>
    </div>
  `,
  host: {
    '(document:click)': 'onClickDocument($event)',
  },
})
export class TimepickerComponent {
  @Input() date: string; // 必须是一个有效的Date字符串
  @Output() dateChange = new EventEmitter<string>();
  @Input() options: any = { init: 'now', showSecond: false, hideTime: false };
  @Input() readonly: boolean = false;
  time: any;
  dateTime: string;
  timeTime: string;
  loaded: boolean;
  opts: any;
  showDropdown: boolean;
  constructor(private _elemRef: ElementRef) {
  }

  ngOnInit() {
    this.opts = Object.assign({}, this.options);
    delete this.opts.init;
    this.time = new Date(this.date);
    if (!this.date || this.time == 'Invalid Date') this.time = new Date();

    if (!this.date && this.options.init !== 'now') return this.loaded = true;

    this.timeFormat();
    this.dateTime = this.timeTime = this.date;
    this.loaded = true;
  }

  timeFormat() {
    this.date = this.time.toISOString();
    this.dateChange.emit(this.date);
  }

  onChange() {
    if (this.readonly) return;

    let d = new Date(this.dateTime);
    let t = new Date(this.timeTime);
    this.time = new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.getHours(), t.getMinutes(), t.getSeconds());
    this.timeFormat();
  }

  getDateStr() {
    return this.time.getFullYear() + '-' + (this.time.getMonth() + 1) + '-' + this.time.getDate();
  }

  onShow(event: any, hide?: boolean) {
    event.stopPropagation();

    if (hide) this.showDropdown = false;
    else this.showDropdown = true;
  }

  onClickDocument(event) {
    if (!this._elemRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }
}

require('./datetime.pcss');

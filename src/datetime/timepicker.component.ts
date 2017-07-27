import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-timepicker',
  template: `
    <div class="ui-timepicker" *ngIf="loaded" (click)="onShow($event)" >
      <div class="flex middle input">
        <span class="full">{{time | date:'yyyy-MM-dd HH:mm:ss'}}</span>
        <i class="iconfont icon-triangle-down"></i>
      </div>
      <div class="dropdown" [class.block]="showDropdown">
        <ui-calendar [(date)]="dateTime" (dateChange)="onChange()" [options]="opts" [readonly]="readonly"  class="block"></ui-calendar>
        <ui-time [(date)]="timeTime" (dateChange)="onChange()" [options]="opts" [readonly]="readonly"  class="block"></ui-time>
      </div>     
    </div>
  `,
})
export class TimepickerComponent {
  @Input() date: string; // 必须是一个有效的Date字符串
  @Output() dateChange = new EventEmitter<string>();
  @Input() options: any = {init: 'now', showSecond: false};
  @Input() readonly: boolean = false;
  time: any;
  dateTime: string;
  timeTime: string;
  loaded: boolean;
  opts: any;
  showDropdown: boolean;
  constructor() {
    document.onclick = () => {
      this.showDropdown = false;
    };
  }

  ngOnInit () {
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

  onShow(event: any) {
    event.stopPropagation();
    this.showDropdown = true;
  }
}

require('./datetime.pcss');

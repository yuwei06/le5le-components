import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-time',
  template: `
    <div class="ui-time" >
      <span>
        <select class="input" name="time-hour" [(ngModel)]="hour" (change)="onChange()" [disabled]="readonly">
          <option *ngFor="let item of seconds" [value]="item">{{item}}</option>
        </select>
      </span>
      <span>
        :
        <select class="input" name="time-minute" [(ngModel)]="minute" (change)="onChange()" [disabled]="readonly">
          <option *ngFor="let item of minutes" [value]="item">{{item}}</option>
        </select>
      </span>
      <span *ngIf="options.showSecond">
        <select class="input" name="time-second" [(ngModel)]="second" (change)="onChange()" [disabled]="readonly">
          <option *ngFor="let item of seconds" [value]="item">{{item}}</option>
        </select>
      </span>
    </div>
  `,
})
export class TimeComponent {
  @Input() date: string; // 必须是一个有效的Date字符串
  @Output() dateChange = new EventEmitter<string>();
  @Input() options: any = {init: 'now', showSecond: false};
  @Input() readonly: boolean = false;
  hour: number;
  minute: number; // 从0开始
  second: number;
  time: any;
  hours: number[] = [];
  minutes: number[] = [];
  seconds: number[] = [];
  constructor() {
    for (let i = 0; i < 24; ++i) {
      this.hours.push(i);
    }
    for (let i = 0; i < 60; ++i) {
      this.minutes.push(i);
      this.seconds.push(i);
    }
  }

  ngOnInit () {
    this.time = new Date(this.date);
    if (!this.date || this.time == 'Invalid Date') this.time = new Date();

    this.hour = this.time.getHours();
    this.minute = this.time.getMinutes();
    this.second = this.time.getSeconds();
    if (!this.options.showSecond) {
      this.second = 0;
      this.time.setSeconds(0);
    }

    if (!this.date && this.options.init !== 'now') return;
    this.timeFormat();
  }

  timeFormat() {
    this.date = this.time.toISOString();
    this.dateChange.emit(this.date);
  }

  onChange(item?: any) {
    if (this.readonly) return;

    this.time.setHours(this.hour, this.minute, this.second);
    this.timeFormat();
  }
}

require('./datetime.pcss');

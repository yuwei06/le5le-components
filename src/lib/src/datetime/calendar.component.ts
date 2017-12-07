import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-calendar',
  template: `
    <div class="ui-calendar" [class.readonly]="readonly">
      <div class="caption" *ngIf="!options.hideCaption">
        <span>
          <select [(ngModel)]="year" (change)="onChange()" [disabled]="readonly">
            <option *ngFor="let item of years" [value]="item">{{item}}年</option>
          </select>
        </span>
        <span>
          <select [(ngModel)]="month" (change)="onChange()" [disabled]="readonly">
            <option value="0">1月</option>
            <option value="1">2月</option>
            <option value="2">3月</option>
            <option value="3">4月</option>
            <option value="4">5月</option>
            <option value="5">6月</option>
            <option value="6">7月</option>
            <option value="7">8月</option>
            <option value="8">9月</option>
            <option value="9">10月</option>
            <option value="10">11月</option>
            <option value="11">12月</option>
          </select>
        </span>
      </div>
      <div class="week" *ngFor="let week of calendar">
        <div class="day"  *ngFor="let item of week" (click)="onChange(item)"
             [class.gray]="item.month !== month " [class.active]="item.year === year && item.month === month && item.day === day">
          <span>{{item.day}}</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./datetime.css']
})
export class CalendarComponent {
  @Input() date: string; // 必须是一个有效的Date字符串
  @Output() dateChange = new EventEmitter<string>();
  @Input() options: any = { init: 'now' };
  @Input() readonly: boolean = false;
  year: number;
  month: number; // 从0开始
  day: number;
  calendar: any[] = [];
  years: number[] = [];
  time: any;
  constructor() {
  }

  ngOnInit() {
    this.time = new Date(this.date);
    if (!this.date || this.time == 'Invalid Date') this.time = new Date();
    this.year = this.time.getFullYear();
    this.getYearOptions(this.year);
    this.month = this.time.getMonth();
    this.getCalendar(this.year, this.month);

    if (!this.date && this.options.init !== 'now') return;
    this.day = this.time.getDate();
    this.timeFormat();
  }

  getYearOptions(year: number) {
    this.years = [];
    for (let i = 100; i > 0; --i) {
      this.years.push(year - i);
    }

    for (let i = 0; i < 100; ++i) {
      this.years.push(year + i);
    }
  }

  isLeap(year: number): number {
    return year % 4 === 0 ? (year % 100 !== 0 ? 1 : (year % 400 === 0 ? 1 : 0)) : 0;
  }

  getCalendar(year: number, month: number) {
    this.calendar = [];
    let firstDay = new Date(this.year, this.month, 1);
    let dayOfWeek = firstDay.getDay();
    let daysOfMonth = new Array(31, 28 + this.isLeap(this.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    let rows = Math.ceil((dayOfWeek + daysOfMonth[month]) / 7);
    for (let i = 0; i < rows; ++i) {
      let row: any[] = [];
      for (let j = 0; j < 7; ++j) {
        // 单元格自然序列号
        let index = i * 7 + j;
        let day = index - dayOfWeek + 1;
        if (day <= 0) {
          if (month > 1) {
            row.push({
              year: year,
              month: month - 1,
              day: daysOfMonth[month - 1] + day
            });
          }
          else {
            row.push({
              year: year - 1,
              month: 12,
              day: 31 + day
            });
          }
        }
        else if (day > daysOfMonth[month]) {
          if (month < 12) {
            row.push({
              year: year,
              month: month + 1,
              day: day - daysOfMonth[month]
            });
          }
          else {
            row.push({
              year: year + 1,
              month: 1,
              day: day - daysOfMonth[month]
            });
          }
        }
        else {
          row.push({
            year: year,
            month: month,
            day: day
          });
        }
      }
      this.calendar.push(row);
    }
  }

  onChange(item?: any) {
    if (this.readonly) return;

    if (item) {
      this.year = item.year;
      this.month = item.month;
      this.day = item.day;
    }
    this.getCalendar(this.year, this.month);
    this.time = new Date(this.year, this.month, this.day);
    this.timeFormat();
  }

  timeFormat() {
    this.date = this.time.toISOString();
    this.dateChange.emit(this.date);
  }
}

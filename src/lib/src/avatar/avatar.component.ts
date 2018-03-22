import { Component, Input, OnInit, ViewEncapsulation, SimpleChange } from '@angular/core';

@Component({
  selector: 'ui-avatar',
  template: `
    <div class="ui-avatar" [ngStyle]="getStyle()">
      <img *ngIf="img" [src]="img">
      <span *ngIf="!img">{{ char }}</span>
    </div>
  `,
  providers: [],
  styleUrls: ['./avatar.css'],
  encapsulation: ViewEncapsulation.None
})
export class AvatarComponent implements OnInit {
  @Input() letters: string = '';
  @Input() img: string = '';

  colors = ['#673AB7', '#9C27B0', '#2196F3', '#03a9f4', '#8bc34a', '#00bcd4', '#009688', '#4caf50', '#ffc107', '#ff9800'];
  color: string = '#673AB7';
  char: string;
  constructor() {}

  ngOnInit() {
    if (this.img) return;
    if (!this.letters) this.letters = '';
    else this.char = this.letters[0].toUpperCase();

    let num: number = 0;
    for (const item of this.letters) {
      num += item.charCodeAt(0);
    }
    this.color = this.colors[num % 10];
  }

  getStyle() {
    return {
      background: this.color
    };
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (changes['letters'] || changes['img']) {
      this.ngOnInit();
    }
  }
}

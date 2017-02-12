import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'switch-component',
  template: `
    <span *ngIf="checked" class="ui-switch on {{onClass}}" (click)="onCheck(0)">
      <span class="desc">{{onDesc}}</span>
    </span>
    <span *ngIf="!checked" class="ui-switch off {{offClass}}" (click)="onCheck(1)">
      <span class="desc">{{offDesc}}</span>
    </span>
  `
})
export class SwitchComponent {
  @Input() checked: number;
  @Output() checkedChange = new EventEmitter<any>();
  @Input() onDesc: string;
  @Input() offDesc: string;
  @Input() onClass: string;
  @Input() offClass: string;
  @Output() change = new EventEmitter<any>();
  constructor() {
  }

  onCheck (b: number) {
    this.checked = b;
    this.checkedChange.emit(b);
    this.change.emit(b);
  }
}

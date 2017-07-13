import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ui-switch',
  template: `
    <span *ngIf="checked" class="ui-switch on {{onClass}}" (click)="onCheck(false)">
      <span>{{onDesc}}</span>
      <span class="blank">{{onDesc}}</span>
    </span>
    <span *ngIf="!checked" class="ui-switch off {{offClass}}" (click)="onCheck(true)">
      <span class="blank">{{offDesc}}</span>
      <span>{{offDesc}}</span>     
    </span>
  `
})
export class SwitchComponent {
  @Input() checked: boolean;
  @Output() checkedChange = new EventEmitter<any>();
  @Input() onDesc: string;
  @Input() offDesc: string;
  @Input() onClass: string;
  @Input() offClass: string;
  @Output() change = new EventEmitter<any>();
  @Input() readonly : boolean = false;
  constructor() {
  }

  onCheck (b: boolean) {
    if (this.readonly) return;

    this.checked = b;
    this.checkedChange.emit(b);
    this.change.emit(b);
  }
}

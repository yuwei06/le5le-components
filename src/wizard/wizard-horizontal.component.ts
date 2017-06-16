import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ui-wizard-horizontal',
  template: `
    <div class="wizard horizontal">
      <div *ngFor="let item of steps; let i = index" class="item" [ngStyle]="stepStyle"
           [class.success]="(i+1) < step" [class.active]="(i+1) === step">
        <div class="desc" [class.click]="item.enable || (i+1) < step" (click)="onStep(item, i+1)">
          <div class="icon"></div>
          <i class="{{item.class}}"></i>
          <div class="name">{{item.name}}</div>
        </div>
        <div *ngIf="i < steps.length - 1" class="line"></div>
      </div>
    </div>
  `
})
export class WizardHorizontalComponent {
  @Input() step: number = 1;
  @Output() stepChange = new EventEmitter<number>();
  @Input() steps: any[] = [{}, {}, {}];
  stepStyle: any;
  constructor() {
  }

  ngOnInit() {
    this.stepStyle = {
      'flex-shrink': 0,
      width: 'calc(100% / ' + (this.steps.length-1) + ')'
    };
  }

  onStep (stepObj: any, stepIndex: number) {
    if (this.step <= stepIndex && !stepObj.enable) return;

    this.stepChange.emit(stepIndex);
  }
}

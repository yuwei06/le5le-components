import { Component, ElementRef } from '@angular/core';
import { TimepickerComponent } from '../../../../../lib/src/datetime/timepicker.component';

@Component({
  selector: 'component-time',
  templateUrl: 'time.component.html'
})
export class ComponentTimeComponent {
  timeOptions = {
    init: ''
  };
  date: any = {};
  constructor(el: ElementRef) {}
}

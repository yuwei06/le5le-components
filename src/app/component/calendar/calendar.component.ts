import { Component } from '@angular/core';

@Component({
  selector: 'app-component-calendar',
  templateUrl: 'calendar.component.html',
  providers: [],
  styleUrls: ['./calendar.component.scss']
})
export class ComponentCalendarComponent {
  date;
  constructor() {}

  onChange(data) {
    console.log('select change:', data);
  }
}

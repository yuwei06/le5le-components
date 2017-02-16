import {Component} from '@angular/core';

@Component({
  selector: 'component-switch',
  templateUrl: "switch.component.html"
})
export class ComponentSwitchComponent {
  checked1: boolean = true;
  checked2: boolean = true;
  checked3: boolean = false;
  checked4: boolean = false;
  constructor() {
  }
}

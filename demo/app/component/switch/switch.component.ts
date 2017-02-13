import {Component} from '@angular/core';

@Component({
  selector: 'component-switch',
  templateUrl: "switch.component.html"
})
export class ComponentSwitchComponent {
  private checked1: boolean = true;
  private checked2: boolean = true;
  private checked3: boolean = false;
  private checked4: boolean = false;
  constructor() {
  }
}

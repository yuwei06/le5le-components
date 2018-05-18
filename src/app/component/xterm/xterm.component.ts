import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-component-xterm',
  templateUrl: 'xterm.component.html',
  providers: [],
  styleUrls: ['./xterm.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComponentXtermComponent {
  url: string;
  socketUrl: string;
  max: boolean;
  constructor() {}
}

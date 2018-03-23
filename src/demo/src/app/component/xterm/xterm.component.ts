import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'component-xterm',
  templateUrl: 'xterm.component.html',
  providers: [],
  styleUrls: ['./xterm.component.pcss'],
  encapsulation: ViewEncapsulation.None
})
export class ComponentXtermComponent {
  url: string;
  socketUrl: string;
  max: boolean;
  constructor() {}
}

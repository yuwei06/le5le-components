import {Component} from '@angular/core';

@Component({
  selector: 'component-ellipsis',
  templateUrl: "ellipsis.component.html"
})
export class ComponentEllipsisComponent {
  text: string = '123456712345678123456789';
  constructor() {
  }
}

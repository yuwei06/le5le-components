import {Component} from '@angular/core';

@Component({
  selector: 'component-touchForm',
  templateUrl: "touchForm.component.html"
})
export class ComponentTouchFormComponent {
  form: any = {};
  constructor() {
  }

  onSubmit() {
    console.info('Form submit.');
  }
}

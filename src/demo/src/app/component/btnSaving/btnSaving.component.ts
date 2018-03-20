import {Component} from '@angular/core';

@Component({
  selector: 'component-btnSaving',
  templateUrl: "btnSaving.component.html"
})
export class ComponentBtnSavingComponent {
  saving1: boolean;
  saving2: boolean;
  constructor() {
  }

  onSave1 () {
    this.saving1 = true;
  }

  onSave2 () {
    this.saving2 = true;
  }

  onCancel () {
    this.saving1 = false;
    this.saving2 = false;
  }

}

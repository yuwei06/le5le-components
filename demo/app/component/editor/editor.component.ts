import {Component} from '@angular/core';

@Component({
  selector: 'component-editor',
  templateUrl: "editor.component.html"
})
export class ComponentEditorComponent {
  templates: any[] = [];
  article: any = {url:'', content: ''};
  constructor() {
  }
}

import {Component} from '@angular/core';

@Component({
  selector: 'component-editor',
  templateUrl: "editor.component.html"
})
export class ComponentEditorComponent {
  templates: any[] = [{content: '<h1>标题</h1><div class="abstract">abstract</div><div>正文正文正文</div>', title: '标题', abstract: 'abstract'}];
  article: any = {url:'', content: '', title: '', abstract: ''};
  saving: boolean;
  constructor() {
  }

  onSelectTemplate (template: any) {
    this.article = Object.assign({}, template);
  }

  onEditTemplate (template: any) {
    this.article = Object.assign({}, template);
  }

  onDeleteTemplate (template: any) {
  }

  onSubmit(editor: any) {
    if (!editor || this.saving) return;

    // 获取最新数据
    let article = Object.assign({}, this.article);
    article.title = editor.getTitle();
    article.abstract = editor.getAbstract();
    article.content = editor.getContent();
    // Do sth.
  }
}

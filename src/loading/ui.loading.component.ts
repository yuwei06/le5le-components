import {Component, Input} from '@angular/core';

@Component({
  selector: 'ui-loading',
  template: `<div class="text-center" style="height: 100%"><div class="full"><i class="iconfont icon-loading icon-spin"></i>&nbsp;Loading... </div></div>`
})
export class UiLoadingComponent {
  constructor() {
  }
}

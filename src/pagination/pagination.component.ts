import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ui-pagination',
  template: `
    <div class="pagination">
      <div class="full">当前为第{{pageIndex}}页，共{{pages.length}}页 {{pageTotal}}条记录</div>
      <div class="buttons">
        <a (click)="goPage(pageIndex-1)"><i class="iconfont icon-angle-left"></i></a>
        <a *ngFor="let i of pages" (click)="goPage(i)" [class.active]="pageIndex===i">{{i}}</a>
        <a *ngIf="pages.length > 10">...</a>
        <a (click)="goPage(pageIndex+1)"><i class="iconfont icon-angle-right"></i></a>
      </div>
    </div>
  `
})
export class PaginationComponent {
  @Input() pageIndex: number = 1;
  @Output() pageIndexChange = new EventEmitter<any>();
  @Input() pageCount: number = 1;
  @Input() pageTotal: number = 1;
  @Output() change = new EventEmitter<any>();
  pages: number[] = [1];
  constructor() {
  }

  ngOnInit() {
    if (!this.pageTotal || this.pageTotal < 1) this.pages = [1];
    else {
      let size = Math.ceil(this.pageTotal/this.pageCount);
      for (let i=1; i < size; ++i) this.pages.push(i+1);
    }
  }

  goPage (pageIndex: number) {
    if (pageIndex < 1 || pageIndex > this.pages.length) return;

    this.pageIndex = pageIndex;
    this.pageIndexChange.emit(pageIndex);
    this.change.emit(pageIndex);
  }
}

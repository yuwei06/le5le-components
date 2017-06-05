import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ui-pagination',
  template: `
    <div class="pagination">
      <div class="full">当前为第{{pageIndex}}页，共{{pages.length}}页 {{pageTotal}}条记录</div>
      <div class="buttons">
        <a (click)="goPage(pageIndex-1)"><i class="iconfont icon-angle-left"></i></a>
        <ng-template ngFor let-item let-i="index" [ngForOf]="pages" >
          <a *ngIf="item === 1 && !canShow(1)">...</a>
          <a *ngIf="canShow(item)" (click)="goPage(item)" [class.active]="pageIndex===item">{{item}}</a>
        </ng-template>        
        <a *ngIf="pageIndex > 5 && pages.length - pageIndex > 4">...</a>
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

  goPage(pageIndex: number) {
    if (pageIndex < 1 || pageIndex > this.pages.length) return;

    this.pageIndex = pageIndex;
    this.pageIndexChange.emit(pageIndex);
    this.change.emit(pageIndex);
  }

  canShow(index: number) {
    if (this.pages.length <= 10 || index === this.pageIndex) return true;

    if (this.pageIndex < 6) {
      if (index <= 10) return true;

      return false;
    }

    if (this.pages.length - this.pageIndex < 4) {
      if (index > this.pageIndex || (this.pageIndex - index) < (10 - this.pages.length + this.pageIndex)) return true;

      return false;
    }

    if (index < this.pageIndex && (this.pageIndex - index) < 6) return true;
    if (index > this.pageIndex && (index - this.pageIndex) < 5) return true;

    return false;
  }
}

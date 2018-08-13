import {
  OnInit,
  OnChanges,
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChange,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ui-pagination',
  template: `
    <div class="pagination" *ngIf="pages.length>1">
      <div class="full">当前为第{{ pageIndex }}页，共{{ pages.length }}页 {{ pageTotal }}条记录</div>
      <div class="buttons">
        <a (click)="goPage(pageIndex-1)"><i class="iconfont icon-angle-left"></i></a>
        <ng-template ngFor let-item let-i="index" [ngForOf]="pages" >
          <a *ngIf="item === 1 && !canShow(1)" (click)="goPage(pageIndex-4)">...</a>
          <a *ngIf="canShow(item)" (click)="goPage(item)" [class.active]="pageIndex===item">{{ item }}</a>
        </ng-template>
        <a *ngIf="pages.length > 10 && pages.length - pageIndex > 4" (click)="goPage(pageIndex+4)">...</a>
        <a (click)="goPage(pageIndex+1)"><i class="iconfont icon-angle-right"></i></a>
      </div>
    </div>
  `,
  styleUrls: ['./pagination.css'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pageIndex = 1;
  @Output() pageIndexChange = new EventEmitter<any>();
  @Input() pageCount = 1;
  @Input() pageTotal = 1;
  @Output() change = new EventEmitter<any>();
  @Input() skipQueryChange = false;
  pages: number[] = [1];
  constructor(
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.pages = [1];
    if (this.pageTotal && this.pageTotal > 1) {
      const size = Math.ceil(this.pageTotal / this.pageCount);
      for (let i = 1; i < size; ++i) {
        this.pages.push(i + 1);
      }
    }
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    this.ngOnInit();
  }

  goPage(pageIndex: number) {
    if (pageIndex < 1 || pageIndex > this.pages.length) {
      return;
    }

    this.pageIndex = pageIndex;
    this.pageIndexChange.emit(pageIndex);
    this.change.emit(pageIndex);

    if (!this.skipQueryChange) {
      let paths = window.location.pathname.split('/');
      paths[0] = '/' + paths[0];
      if (!paths[paths.length - 1]) {
        paths = paths.splice(paths.length - 1, 1);
      }
      const queryParams: any = {};
      // tslint:disable-next-line:forin
      for (const key in this._activateRoute.snapshot.queryParams) {
        queryParams[key] = this._activateRoute.snapshot.queryParams[key];
      }
      queryParams['pageIndex'] = this.pageIndex;
      queryParams['pageCount'] = this.pageCount;
      this._router.navigate(paths, { queryParams });
    }
  }

  canShow(index: number) {
    if (this.pages.length <= 10 || index === this.pageIndex) {
      return true;
    }

    if (this.pageIndex < 6) {
      if (index <= 10) {
        return true;
      }

      return false;
    }

    if (this.pages.length - this.pageIndex < 4) {
      if (
        index > this.pageIndex ||
        this.pageIndex - index < 10 - this.pages.length + this.pageIndex
      ) {
        return true;
      }

      return false;
    }

    if (index < this.pageIndex && this.pageIndex - index < 6) {
      return true;
    }
    if (index > this.pageIndex && index - this.pageIndex < 5) {
      return true;
    }

    return false;
  }
}

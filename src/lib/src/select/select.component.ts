import { Component, Input, forwardRef, ElementRef, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

@Component({
  selector: 'ui-select',
  template: `
    <div class="ui-select input" [class.readonly]="readonly" (click)="onClick()">
      <div class="flex ph5" *ngIf="multi">
        <ng-template ngFor let-item let-i="index" [ngForOf]="options.list">
          <div [class.selected]="multi" *ngIf="isChecked(item)">
            {{options.name? item[options.name]: item}}
            <i *ngIf="!readonly" class="iconfont icon-delete ml5" (click)="onDel(item, i)"></i>
          </div>
        </ng-template>

        <input *ngIf="!value || !value.length" class="full" [placeholder]="placeholder">

        <input #input *ngIf="value && value.length" style="width:.01rem" (keyup.backspace)="onMultiDel()">
        <i class="iconfont icon-triangle-down right" (click)="onClickMulti()"></i>
      </div>
      <div class="flex middle" *ngIf="!multi">
        <input class="full pl10" [placeholder]="placeholder" [(ngModel)]="inputValue" (change)="onInputChange()"
          [readOnly]="readonly || inputReadonly"  (click)="onClickInput($event)">
        <i class="iconfont icon-triangle-down right" (click)="clickShowDropdown=-1;showDropdown=true"></i>
      </div>
      <div class="dropdown" [class.block]="showDropdown" *ngIf="!readonly">
        <div class="item" *ngIf="!multi && !options.autocomplete && !options.noDefaultOption"
          (click)="onSelect($event, null)">{{placeholder || '请选择'}}</div>
        <div class="item" *ngIf="loading">
          <span class="iconfont icon-loading icon-spin"></span>
          Loading...
        </div>
        <ng-template ngFor let-item let-i="index" [ngForOf]="options.list">
          <div class="item flex middle" *ngIf="!multi || !isChecked(item)" (click)="onSelect($event, item)">
            <label class="full">{{options.name? item[options.name]: item}}</label>
            <span class="iconfont icon-delete pointer" *ngIf="item.del" (click)="onDelOption($event, item, i)"></span>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: {
    '(document:click)': 'onClickDocument($event)',
  },
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }],
  styleUrls: ['./select.pcss']
})
export class SelectComponent implements OnInit, ControlValueAccessor, Validator {

  // 下拉列表选项，list表示下拉列表数组，其中：id表示value的来源，name表示显示来源；当id或name为空时，表示list为字符串数组
  // autocomplete 表示自动完成；noDefaultOption 表示不要“请选择”
  @Input() options: any = { id: 'id', name: 'name', list: [] };

  // 是否多选
  @Input() multi: boolean = true;

  @Input() loading: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() placeholder: string = '';
  @Output() change = new EventEmitter<any>();

  @ViewChild('input') input: ElementRef;

  private valueChange = (value: any) => { };
  private touch = () => { };

  // ngModeld的实际值
  private _value: any;

  // 下拉选项显示控制
  clickShowDropdown: number = -1;
  showDropdown: boolean = false;
  @Input() set dropdown(show: boolean) {
    if (this.clickShowDropdown < 0) {
      this.showDropdown = false;
      this.clickShowDropdown = 0;
      return;
    }

    this.clickShowDropdown = 1;
    this.showDropdown = !this.showDropdown;
  }

  // 单选显示数据
  inputValue: string;
  // 单选输入框只读属性
  inputReadonly: boolean = true;

  constructor(private _elemRef: ElementRef) {
  }

  ngOnInit() {
    if (this.multi) this._value = [];
    else if (this.options.autocomplete) this.inputReadonly = false;
    if (!this.placeholder) this.placeholder = this.multi ? '请选择 [可多选]' : '请选择';
  }

  checkInputReadonly(item: any) {
    if (!item) return;

    // 默认单选输入是只读的；自动完成模式或者input标识则可输入
    this.inputReadonly = (!this.options.autocomplete && !item.input) ? true : false;
  }

  get value(): any { return this._value; }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      if (!this.multi) {
        this.inputValue = this._value;

        if (this._value && this.options.id) {
          let item: any;
          for (let i of this.options.list) {
            if (i[this.options.id] == v) item = i;
          }
          if (item) this.inputValue = this.options.name ? item[this.options.name] : item;
        }
      }
    }
  }

  // 实现Validator接口，验证有效性
  validate(c: AbstractControl): { [key: string]: any } {
    if (!this.required) return;

    if (!this._value || (this.multi && this._value.length === 0)) {
      return { 'required': true };
    }
  }

  // model -> view
  writeValue(value: any) {
    this.value = value;

    if (!this.multi && value && this.options.list) {
      for (let item of this.options.list) {
        if (this.options.id) {
          if (value === item[this.options.id]) this.checkInputReadonly(item);
        }
        else if (value === item) this.checkInputReadonly(item);
      }
    }
  }

  // view -> model，当控件change后，调用的函数通知改变model
  registerOnChange(fn: any) {
    this.valueChange = fn;
  }

  // 通知touched调用的函数
  registerOnTouched(fn: any) {
    this.touch = fn;
  }

  onSelect(event: any, item: any) {
    if (event) event.stopPropagation();

    this.showDropdown = false;

    if (this.multi) {
      if (!this._value) this._value = [];
      if (this.options.id) this._value.push(item[this.options.id]);
      else this._value.push(item);
    } else {
      if (item) this._value = this.options.id ? item[this.options.id] : item;
      else this._value = '';

      if (this._value) this.inputValue = this.options.name ? item[this.options.name] : item;
      else this.inputValue = '';

      this.checkInputReadonly(item);
    }
    this.valueChange(this._value);
    this.touch();
    this.change.emit(item);
  }

  onInputChange() {
    this.value = this.inputValue;
    this.valueChange(this.inputValue);
    this.change.emit(this.inputValue);
  }

  onDel(item: any, index: number) {
    for (let i = 0; i < this._value.length; ++i) {
      if (this.options.id) {
        if (this._value[i] === item[this.options.id]) this._value.splice(i, 1);
      }
      else if (this._value[i] === item) this._value.splice(i, 1);
    }

    this.valueChange(this._value);
    this.change.emit(this._value);
  }

  onClick() {
    if (this.multi) this.showDropdown = true;
  }

  onClickInput(event: any) {
    this.clickShowDropdown = -1;
    if ((this.options.autocomplete && this.options.list.length) || this.inputReadonly) this.showDropdown = true;
  }

  onClickDocument(event) {
    if (!this._elemRef.nativeElement.contains(event.target)) {
      if (this.clickShowDropdown !== 1) this.showDropdown = false;
      this.clickShowDropdown = 0;
    }
  }

  onClickMulti() {
    if (this.input) this.input.nativeElement.focus();
  }

  onMultiDel() {
    if (!this._value || !this._value.length) return;

    this._value.pop();
    this.valueChange(this._value);
    this.change.emit(this._value);
  }

  isChecked(item: any) {
    if (!this.multi) {
      if (this.options.id) return this._value === item[this.options.id];
      else return this._value === item;
    }

    if (!this._value || !this._value.length) return false;
    for (let v of this._value) {
      if (this.options.id) {
        if (v === item[this.options.id]) return true;
      }
      else if (v === item) return true;
    }
  }

  onDelOption(event: any, item: any, i: number) {
    event.stopPropagation();
    if (this.options.delOption) this.options.delOption(item, i);
  }
}

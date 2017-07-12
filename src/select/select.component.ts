import { Component, Input, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

@Component({
  selector: 'ui-select',
  template: `
    <div class="ui-select input" [attr.contenteditable]="multi" [class.dropdown-container]="!multi">      
      <div contenteditable="false" [class.selected]="multi" *ngFor="let item of selected;let i = index">
        {{item[option.name]}}
        <i *ngIf="multi" class="iconfont icon-delete ml5" (click)="onDel(item, i)"></i>
      </div>
      <div class="dropdown" contenteditable="false">
        <ng-template ngFor let-item let-i="index" [ngForOf]="option.list">
          <div class="item" *ngIf="showItem(item)" (click)="onSelect(item)">{{item[option.name]}}</div>
        </ng-template>        
      </div>
    </div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }],
})
export class SelectComponent implements ControlValueAccessor, Validator {
  selected: any[] = [];
  val: any;
  @Input() option: any = {id: 'id', name: 'name', list: []};
  @Input() multi: boolean = true;
  @Input() required: boolean = false;
  valueChange: (value: any) => void = () => {};
  constructor() {
  }

  getSelected() {
    if (!this.val) return;

    for (let item of this.option.list) {
      if (this.multi) {
        for (let v of this.val) {
          if (v === item[this.option.id]) this.selected.push(item);
        }
      } else {
        if (this.val === item[this.option.id]) this.selected.push(item);
      }
    }
  }

  get value(): any { return this.val; };

  set value(v: any) {
    if (v && v !== this.val) {
      this.valueChange(this.val);
      this.getSelected();
    }
  }

  validate(c: AbstractControl): {[key: string]: any} {
    if (!this.val || (this.multi && this.val.length === 0)) {
      return {'required': true};
    }
  }

  writeValue(value: any) {
    this.val = value;
    this.getSelected();
  }

  registerOnChange(fn: any) {
    this.valueChange = fn;
  }

  registerOnTouched(fn: any) {
  }

  showItem(option: any): boolean {
    if (!this.val || !this.multi) return true;

    let show = true;
    for (let item of this.selected) {
      if (item[this.option.id] === option[this.option.id]) {
        show = false;
        break;
      }
    }
    return show;
  }

  onSelect(item: any) {
    if (this.multi) {
      if (!this.val) this.val = [];
      this.selected.push(item);
      this.val.push(item[this.option.id]);
    } else {
      this.selected = [item];
      this.val = item[this.option.id];
    }
    this.valueChange(this.val);
  }

  onDel(item: any, index: number) {
    for (let i = 0; i < this.val.length; ++i) {
      if (this.val[i] === item[this.option.id]) this.val.splice(i, 1);
    }

    this.selected.splice(index ,1);
    this.valueChange(this.val);
  }
}

require('./select.pcss');

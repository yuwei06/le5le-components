import { Component, Input, forwardRef, ElementRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

enum CodeType { default, reservedWords, string, num, time, href };

@Component({
  selector: 'ui-code',
  template: `
    <div class="ui-code {{options.theme}}" [class.margin3]="rows.length>99" [class.margin4]="rows.length>999">
      <div class="margin">
        <div *ngFor="let row of rows; let i=index">{{i+1}}</div>
      </div>
      <div class="text" [attr.contenteditable]="!readonly" (blur)="onBlur()" (keydown)="onKeyDown($event)">
        <div *ngFor="let row of rows; let i=index" class="row row{{i}}">
          <div class="margin-num" contenteditable="false">{{i+1}}</div>
          <ng-template ngFor let-col let-j="index" [ngForOf]="row" >
            <span class="default grid{{i}}{{j}}" *ngIf="col.type===0 && col.text">{{col.text}}</span>
            <span class="default grid{{i}}{{j}}" *ngIf="col.type===0 && !col.text">&nbsp;</span>
            <span class="reserved grid{{i}}{{j}}" *ngIf="col.type===1">{{col.text}}</span>
            <span class="string grid{{i}}{{j}}" *ngIf="col.type===2">{{col.text}}</span>
            <span class="num grid{{i}}{{j}}" *ngIf="col.type===3">{{col.text}}</span>
            <span class="time grid{{i}}{{j}}" *ngIf="col.type===4">{{col.text}}</span>
            <span class="href grid{{i}}{{j}}" *ngIf="col.type===5">{{col.text}}</span>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CodeComponent),
    multi: true
  }],
})
export class CodeComponent implements ControlValueAccessor {
  private val: any;
  @Input() options: any = {};
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  valueChange: (value: any) => void = () => { };
  rows: any[] = [];
  constructor(private _elemRef: ElementRef) {
  }

  ngOnInit() {
    if (!this.options.reservedWords) {
      this.options.reservedWords = ["if", "then", "do", "else", "elif", "while", "until", "for", "in",
        "esac", "fi", "fin", "", "fil", "done", "exit", "set", "unset", "export", "function"];
    }
  }

  append(row: string, index?: number) {
    if (index === undefined) this.rows.push(this.parseRow(row));
    else this.rows.splice(index, 0, this.parseRow(row));
  }

  delete(index: number, count: number) {
    this.rows.splice(index, count);
  }

  get value(): any { return this.val; };

  set value(v: any) {
    if (v && v !== this.val) {
      this.valueChange(this.val);
    }
  }

  writeValue(value: any) {
    this.val = value;
    if (value) {
      let rowObjs: any[] = [];
      let rows = value.split('\n');
      for (let row of rows) {
        rowObjs.push(this.parseRow(row));
      }
      this.rows = rowObjs;
    }
  }

  registerOnChange(fn: any) {
    this.valueChange = fn;
  }

  registerOnTouched(fn: any) {
  }

  isReservedWords(word: string) {
    for (let item of this.options.reservedWords) {
      if (word === item) return true;
    }

    return false;
  }

  isString(word: string) {
    if (word.length > 1 && word[0] === "'" && word[word.length - 1] === "'") return true;
    if (word.length > 1 && word[0] === '"' && word[word.length - 1] === '"') return true;

    return false;
  }

  isNum(word: string) {
    return /^[+-]?[0-9]+.?[0-9]*$/.test(word);
  }

  isTime(word: string) {
    if (/\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}/.test(word)) return true;
    else if (/(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]/.test(word)) return true;

    return false;
  }

  isHref(word: string) {
    return /^((https|http)?:\/\/)[^\s]+/.test(word);
  }

  parseRow(text: string) {
    let colObjs: any[] = [];
    let cols = text.split(' ');
    for (let col of cols) {
      let v: any = { type: CodeType.default, text: col };
      if (!col) v.text = '';
      else if (this.isReservedWords(col)) v.type = CodeType.reservedWords;
      else if (this.isString(col)) v.type = CodeType.string;
      else if (this.isNum(col)) v.type = CodeType.num;
      else if (this.isTime(col)) v.type = CodeType.time;
      else if (this.isHref(col)) v.type = CodeType.href;

      colObjs.push(v);
    }
    return colObjs;
  }

  getContent(): string {
    let text: string = '';
    let elems = this._elemRef.nativeElement.querySelectorAll('.text>div');
    for (let i = 0; i < elems.length; ++i) {
      let str: string = elems[i].innerText;
      text += str.replace((i + 1) + '', '');
    }
    return text;
  }

  onBlur() {
    this.val = this.getContent();
    this.valueChange(this.val);
  }

  onKeyDown(event: any) {
    let selection: any = window.getSelection();
    console.info(event, selection, selection.focusNode.textContent)
    if (selection.focusNode.parentNode.nodeName === 'SPAN') {

    }
    // return false;

    // setTimeout(() => {
    //   console.info(this.getContent())
    //   this.writeValue(this.getContent());
    //   this.valueChange(this.val);
    // }, 200);
  }
}

require('./code.pcss');

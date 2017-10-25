import { Component, Input, forwardRef, ElementRef, OnInit, ViewChild, Output, EventEmitter, NgZone } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { MonacoEditorLoaderService } from './monaco-loader.service';

declare const monaco: any;

@Component({
  selector: 'ui-code',
  template: `<div #editor class="ui-code"></div>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CodeComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => CodeComponent),
    multi: true
  }],
})
export class CodeComponent implements OnInit, ControlValueAccessor, Validator {

  @Input() required: boolean = false;
  @Input() options: any = {};
  @Output() change = new EventEmitter();

  @Input() set monacoPath(value) {
    this._monacoLoaderService.monacoPath = value;
    this._monacoLoaderService.load();
  }

  editor: any;
  @ViewChild('editor') editorContent: ElementRef;

  // ngModeld的实际值
  private _value = '';

  private valueChange = (value: any) => { };
  private touch = () => { };

  constructor(private _monacoLoaderService: MonacoEditorLoaderService) {
  }

  get value(): string { return this._value; };
  set value(v: string) {
    if (v !== this._value) this._value = v;
  }

  ngOnInit() {
    this._monacoLoaderService.isMonacoLoaded.subscribe(isLoaded => {
      if (isLoaded) this.initMonaco();
    });
  }

  // Will be called once monaco library is available
  initMonaco() {
    let options = this.options;
    options.value = this._value;
    this.editor = monaco.editor.create(this.editorContent.nativeElement, options);
    this.options.editor = this.editor;

    // Currently setting this option prevents the autocomplete selection with the "Enter" key
    // TODO make sure to propagate the event to the autocomplete
    if (this.options.customPreventCarriageReturn === true) {
      let preventCarriageReturn = this.editor.addCommand(monaco.KeyCode.Enter, function () {
        return false;
      });
    }

    this.editor.getModel().onDidChangeContent((e) => {
      this.updateValue(this.editor.getModel().getValue());
    });

    this.editor.onDidBlurEditor(() => {
      this.change.emit(this._value);
      this.touch();
    });
  }

  updateValue(value: string) {
    this.value = value;
    this.valueChange(value);
    this.touch();
  }

  // model -> view
  writeValue(value: string) {
    this._value = value || '';
    if (this.editor) {
      this.editor.getModel().setValue(this._value);
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

  // 实现Validator接口，验证有效性
  validate(c: AbstractControl): { [key: string]: any } {
    if (!this.required) return;

    if (!this._value) {
      return { 'required': true };
    }
  }

  ngOnDestroy() {
    this.editor.dispose();
  }
}

require('./code.pcss');

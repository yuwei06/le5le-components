import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import * as Terminal from 'xterm/dist/xterm';
import 'xterm/dist/addons/fit/fit.js';
import 'xterm/dist/addons/attach/attach.js';

@Component({
  selector: 'ui-xterm',
  template: `<div class="ui-xterm" #terminal></div>`
})
export class XTermComponent {
  @Input() socketUrl: string;
  @Input() options: any = {};

  @ViewChild('terminal') terminalContainer: ElementRef;
  private xterm: Terminal;
  private socket: WebSocket;
  wsSuccess: boolean;
  constructor() {
  }

  @Input()
  public set winStatus(v: any) {
    this.onResize();
  }

  onResize() {
    setTimeout(() => {
      if (this.xterm) this.xterm.fit();
    }, 100);
    setTimeout(() => {
      if (this.xterm) this.xterm.fit();
    }, 500);
  }

  ngOnInit() {
    this.xterm = new Terminal();
    this.xterm.open(this.terminalContainer.nativeElement);

    this.options.xterm = this.xterm;

    this.socket = new WebSocket(this.socketUrl);
    this.xterm.attach(this.socket, true, true);

    this.onResize();
    this.focus();
  }

  focus() {
    setTimeout(() => {
      this.xterm.focus();
    }, 300);
  }

  ngOnDestroy() {
    if (this.socket) {
      this.xterm.detach(this.socket);
      this.socket.close();
    }
  }
}

require('xterm/dist/xterm.css');
require('./xterm.pcss');

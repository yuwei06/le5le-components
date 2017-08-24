import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import * as Terminal from 'xterm/dist/xterm';
import 'xterm/dist/addons/fit/fit.js';

@Component({
  selector: 'ui-xterm',
  template: `<div class="ui-xterm" #terminal></div>`
})
export class XTermComponent {
  @Input() socketUrl: string;
  @ViewChild('terminal') terminalContainer: ElementRef;
  private xterm: Terminal;
  private socket: WebSocket;
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
    this.xterm.open(this.terminalContainer.nativeElement, false);


    this.socket = new WebSocket(this.socketUrl);

    this.xterm.on('data', (data: any) => {
      this.socket.send(data);
    });

    this.socket.onmessage = (e: any) => {
      this.xterm.write(e.data);
    };

    this.onResize();
  }
}

require('xterm/dist/xterm.css');
require('./xterm.pcss');

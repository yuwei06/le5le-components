import {
  OnInit,
  OnDestroy,
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ViewEncapsulation
} from '@angular/core';

import * as Terminal from 'xterm/dist/xterm';
import * as attach from 'xterm/dist/addons/attach/attach';
import * as fit from 'xterm/dist/addons/fit/fit';
import * as winptyCompat from 'xterm/dist/addons/winptyCompat/winptyCompat';

Terminal.applyAddon(attach);
Terminal.applyAddon(fit);
Terminal.applyAddon(winptyCompat);

@Component({
  selector: 'ui-xterm',
  template: `<div class="ui-xterm" #terminal></div>`,
  styleUrls: ['./xterm.css'],
  encapsulation: ViewEncapsulation.None
})
export class XTermComponent implements OnInit, OnDestroy {
  @Input() socketUrl: string;
  @Input() options: any = {};

  @ViewChild('terminal') terminalHost: ElementRef;
  private xterm: Terminal;
  private socket: WebSocket;
  wsSuccess: boolean;
  constructor() {}

  @Input()
  public set winStatus(v: any) {
    this.onResize();
  }

  onResize() {
    if (!this.xterm) {
      return;
    }

    setTimeout(() => {
      this.xterm.fit();
    }, 100);
    setTimeout(() => {
      this.xterm.fit();
    }, 500);
  }

  ngOnInit() {
    this.xterm = new Terminal();
    this.xterm.open(this.terminalHost.nativeElement, true);
    this.xterm.winptyCompatInit();
    this.xterm.focus();
    this.onResize();

    this.options.xterm = this.xterm;

    this.socket = new WebSocket(this.socketUrl);
    this.socket.onopen = this.attachTerminal;
  }

  focus() {
    setTimeout(() => {
      this.xterm.focus();
    }, 300);
  }

  attachTerminal = () => {
    this.xterm.attach(this.socket);
    this.onResize();
    this.focus();

    this.xterm.attachCustomKeyEventHandler(e => {
      if (e.ctrlKey) {
        // Ctrl  + C
        if (e.keyCode === 67 && this.xterm.hasSelection()) {
          document.execCommand('copy');
          return false;
        } else if (e.keyCode === 86) {
          // Ctrl  + V
          document.execCommand('paste');
          return false;
        }
      }
    });
  };

  ngOnDestroy() {
    if (this.socket) {
      this.xterm.detach(this.socket);
      this.socket.close();
    }
  }
}

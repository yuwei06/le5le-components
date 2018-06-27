import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  noticeContainer = document.querySelector('.notice-container');
  systemContainer = document.querySelector('.system-container');
  constructor() {
    if (!this.noticeContainer) {
      this.noticeContainer = document.createElement('div');
      this.noticeContainer.className = 'notice-container';
      document.body.appendChild(this.noticeContainer);
    }
    if (!this.systemContainer) {
      this.systemContainer = document.createElement('div');
      this.systemContainer.className = 'system-container';
      document.body.appendChild(this.systemContainer);
    }
  }

  // noticeService.notice({body: '已经给您发送找回密码邮件了，请查收！', theme: 'success', timeout:3000, buttons:[{text, cb}]});
  // theme - 风格主题: default, success, warning, error 。
  notice(options: any) {
    if (!options.theme) {
      options.theme = '';
    }

    let timeout: any;

    let rootElem: any = document.createElement('div');
    rootElem.className = 'notice in ' + options.theme;

    const close = (t?) => {
      if (!rootElem) {
        return;
      }

      let c = rootElem.className;
      c = c.replace('in', '');
      c += ' out';
      rootElem.className = c;

      setTimeout(() => {
        if (rootElem) {
          if (!options.theme || options.theme.indexOf('system-notice') < 0) {
            this.noticeContainer.removeChild(rootElem);
          } else {
            this.systemContainer.removeChild(rootElem);
          }
        }
        rootElem = null;
      }, t);
    };

    const bodyElem = document.createElement('div');
    bodyElem.className = 'body';

    const iconElem = document.createElement('i');
    iconElem.className = 'icon iconfont ';
    switch (options.theme) {
      case 'success':
        iconElem.className += 'icon-check';
        break;
      case 'warning':
        iconElem.className += 'icon-noticefill';
        break;
      case 'error':
        iconElem.className += 'icon-noticefill';
        break;
      default:
        iconElem.className += 'icon-star';
        break;
    }
    bodyElem.appendChild(iconElem);

    const textElem = document.createElement('div');
    textElem.className = 'notice-text';
    textElem.innerHTML = options.body;
    bodyElem.appendChild(textElem);

    const closeElem = document.createElement('i');
    closeElem.className = 'iconfont icon-close pointer';
    closeElem.onclick = close;
    bodyElem.appendChild(closeElem);

    rootElem.appendChild(bodyElem);

    const timer = () => {
      if (!options.timeout) {
        options.timeout = 5000;
      }

      timeout = setTimeout(() => {
        close(800);
      }, options.timeout);
    };
    rootElem.onmouseout = timer;
    rootElem.onmouseover = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };

    let footerElem = null;
    if (!options.theme || options.theme.indexOf('system-notice') < 0) {
      this.noticeContainer.appendChild(rootElem);
    } else {
      this.systemContainer.appendChild(rootElem);
    }

    if (options.buttons) {
      for (const item of options.buttons) {
        if (!item.text || !item.cb) {
          continue;
        }

        if (!footerElem) {
          footerElem = document.createElement('div');
          footerElem.className = 'modal-footer';
          rootElem.appendChild(footerElem);
        }

        const btn = document.createElement('button');
        btn.className = 'button default ml10';
        btn.innerHTML = item.text;
        btn.onclick = (event: any) => {
          event.stopPropagation();
          item.cb();
          close(0);
        };
        footerElem.appendChild(btn);
      }
    }

    timer();
  }

  makeHeaderElem(parentElem: any, title: string): any {
    const headerElem = document.createElement('div');
    headerElem.className = 'modal-header';

    const titleContentElem = document.createElement('div');
    titleContentElem.className = 'caption';
    titleContentElem.innerHTML = title;
    headerElem.appendChild(titleContentElem);

    const closeElem = document.createElement('i');
    closeElem.className = 'fr iconfont icon-close';
    closeElem.onclick = (event: any) => {
      event.stopPropagation();
      document.body.removeChild(parentElem);
    };
    headerElem.appendChild(closeElem);

    return headerElem;
  }

  makeFooterElem(okCallback: any, cancelCallback: any, options?: any): any {
    const footerElem = document.createElement('div');
    footerElem.className = 'modal-footer';

    if (!options) {
      options = {};
    }

    if (cancelCallback && !options.noCancel) {
      const cancel = document.createElement('button');
      cancel.className = 'button default ml10';
      cancel.innerHTML = options.cancelText || '取消';
      cancel.onclick = cancelCallback;
      footerElem.appendChild(cancel);
    }

    const ok = document.createElement('button');
    ok.className = 'button primary ml10';
    ok.innerHTML = options.okText || '确定';
    ok.onclick = okCallback;
    footerElem.appendChild(ok);

    return footerElem;
  }

  // noticeService.dialog({body: '是否继续？', callback:(ret:boolean)=>{}});
  // callback 单击确定 ret = true。其他： ret = false。
  dialog(options: any) {
    const elem = document.createElement('div');
    elem.className = 'modal';
    if (options.theme) {
      elem.className += ' ' + options.theme;
    }
    const cancelCallback = (event: any) => {
      event.stopPropagation();
      document.body.removeChild(elem);
      if (options.callback) {
        options.callback(false);
      }
    };

    const modalContentElem = document.createElement('div');
    modalContentElem.className = 'modal-content';
    modalContentElem.onclick = (event: any) => {
      event.stopPropagation();
    };
    elem.appendChild(modalContentElem);

    modalContentElem.appendChild(this.makeHeaderElem(elem, options.title));

    const contentElem = document.createElement('div');
    contentElem.className = 'modal-body';
    modalContentElem.appendChild(contentElem);

    const bodyElem = document.createElement('div');
    bodyElem.innerHTML = options.body;
    contentElem.appendChild(bodyElem);

    const okCallback = (event: any) => {
      event.stopPropagation();
      document.body.removeChild(elem);
      if (options.callback) {
        options.callback(true);
      }
    };
    modalContentElem.appendChild(
      this.makeFooterElem(okCallback, cancelCallback, options)
    );
    document.body.appendChild(elem);
  }

  // noticeService.input({text: '初始值', placeholder: '请输入', required: true, type: 'text', callback:(ret: any)=>{}});
  // required: true - 不允许为空。 type:可选，默认文本
  input(options: any) {
    let inputElem: any;
    const elem = document.createElement('div');
    elem.className = 'modal';
    if (options.theme) {
      elem.className += ' ' + options.theme;
    }
    const cancelCallback = (event: any) => {
      event.stopPropagation();
      document.body.removeChild(elem);
    };

    const modalContentElem = document.createElement('div');
    modalContentElem.className = 'modal-content';
    modalContentElem.onclick = (event: any) => {
      event.stopPropagation();
    };
    elem.appendChild(modalContentElem);

    modalContentElem.appendChild(this.makeHeaderElem(elem, options.title));

    const contentElem = document.createElement('div');
    contentElem.className = 'modal-body';
    modalContentElem.appendChild(contentElem);

    const bodyElem = document.createElement('div');
    contentElem.appendChild(bodyElem);

    if (options.label) {
      const labelElem = document.createElement('div');
      labelElem.className = 'mb10';
      labelElem.innerHTML = options.label;
      bodyElem.appendChild(labelElem);
    }

    inputElem = document.createElement('input');
    inputElem.className = 'input full';
    if (options.text) {
      inputElem.value = options.text;
    }
    if (options.placeholder) {
      inputElem.setAttribute('placeholder', options.placeholder);
    }
    if (options.type) {
      inputElem.setAttribute('type', options.type);
    }
    inputElem.onclick = (event: any) => {
      event.stopPropagation();
    };
    const okCallback = (event: any) => {
      event.stopPropagation();
      if (options.required && !inputElem.value) {
        return;
      }

      document.body.removeChild(elem);
      if (options.callback) {
        options.callback(inputElem.value);
      }
    };
    inputElem.onkeyup = (event: any) => {
      const keyCode: any = event.which || event.keyCode;
      // tslint:disable-next-line:triple-equals
      if (keyCode == 13) {
        okCallback(event);
      }
    };
    bodyElem.appendChild(inputElem);
    modalContentElem.appendChild(
      this.makeFooterElem(okCallback, cancelCallback, options)
    );

    document.body.appendChild(elem);
    inputElem.focus();
  }
}

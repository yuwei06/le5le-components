import { Injectable } from '@angular/core';

@Injectable()
export class NoticeService {
  static offsetHeight: number = 0;
  constructor() {
  }

  // noticeService.notice({body: '已经给您发送找回密码邮件了，请查收！', theme: 'success', timeout:3000});
  // theme - 风格主题: success, warning, error, cyan 。 success
  notice(options: any) {
    if (!options.theme) options.theme = 'success';

    let timeout: any;

    let rootElem: any = document.createElement('div');
    rootElem.className = 'notice in ' + options.theme;

    let close = function () {
      if (!rootElem) return;

      let c = rootElem.className;
      c = c.replace('in', '');
      c += ' out';
      rootElem.className = c;

      NoticeService.offsetHeight -= (rootElem.offsetHeight + 5);
      setTimeout(function () {
        if (rootElem) {
          document.body.removeChild(rootElem);
        }
        rootElem = null;
      }, 500);
    };

    let bodyElem = document.createElement('div');
    bodyElem.className = 'body';
    bodyElem.innerHTML = options.body;

    let closeElem = document.createElement('i');
    closeElem.className = 'iconfont icon-close pointer fr';
    closeElem.onclick = close;
    bodyElem.appendChild(closeElem);

    rootElem.appendChild(bodyElem);

    let timer = function () {
      if (!options.timeout) options.timeout = 2 * 1000;
      timeout = setTimeout(function () {
        close();
      }, options.timeout);
    };
    rootElem.onmouseout = timer;
    rootElem.onmouseover = () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };
    document.body.appendChild(rootElem);
    rootElem.style.top = NoticeService.offsetHeight + 'px';
    NoticeService.offsetHeight += rootElem.offsetHeight + 5;

    timer();
  }

  makeHeaderElem(parentElem: any, title: string): any {
    let headerElem = document.createElement('div');
    headerElem.className = 'modal-header';

    let titleContentElem = document.createElement('div');
    titleContentElem.className = 'caption';
    titleContentElem.innerHTML = title;
    headerElem.appendChild(titleContentElem);

    let closeElem = document.createElement('i');
    closeElem.className = 'fr iconfont icon-close';
    closeElem.onclick = (event: any) => {
      event.stopPropagation();
      document.body.removeChild(parentElem);
    };
    headerElem.appendChild(closeElem);

    return headerElem;
  };

  makeFooterElem(okCallback: any, cancelCallback: any, options?: any): any {
    let footerElem = document.createElement('div');
    footerElem.className = 'modal-footer';

    if (!options) options = {};

    if (cancelCallback && !options.noCancel) {
      let cancel = document.createElement('button');
      cancel.className = 'button default ml10';
      cancel.innerHTML = options.cancelText || '取消';
      cancel.onclick = cancelCallback;
      footerElem.appendChild(cancel);
    }

    let ok = document.createElement('button');
    ok.className = 'button primary ml10';
    ok.innerHTML = options.okText || '确定';
    ok.onclick = okCallback;
    footerElem.appendChild(ok);

    return footerElem;
  }

  // noticeService.dialog({body: '是否继续？', callback:(ret:boolean)=>{}});
  // callback 单击确定 ret = true。其他： ret = false。
  dialog(options: any) {
    let elem = document.createElement('div');
    elem.className = 'modal';
    if (options.theme) elem.className += ' ' + options.theme;
    let cancelCallback: any = function (event: any) {
      event.stopPropagation();
      document.body.removeChild(elem);
      if (options.callback) options.callback(false);
    };

    let modalContentElem = document.createElement('div');
    modalContentElem.className = 'modal-content';
    modalContentElem.onclick = function (event: any) {
      event.stopPropagation();
    };
    elem.appendChild(modalContentElem);

    modalContentElem.appendChild(this.makeHeaderElem(elem, options.title));

    let contentElem = document.createElement('div');
    contentElem.className = 'modal-body';
    modalContentElem.appendChild(contentElem);

    let bodyElem = document.createElement('div');
    bodyElem.innerHTML = options.body;
    contentElem.appendChild(bodyElem);

    let okCallback: any = function (event: any) {
      event.stopPropagation();
      document.body.removeChild(elem);
      if (options.callback) options.callback(true);
    };
    modalContentElem.appendChild(this.makeFooterElem(okCallback, cancelCallback, options));
    document.body.appendChild(elem);
  }

  // noticeService.input({text: '初始值', placeholder: '请输入', required: true, type: 'text', callback:(ret: any)=>{}});
  // required: true - 不允许为空。 type:可选，默认文本
  input(options: any) {
    let inputElem: any;
    let elem = document.createElement('div');
    elem.className = 'modal';
    if (options.theme) elem.className += ' ' + options.theme;
    let cancelCallback: any = function (event: any) {
      event.stopPropagation();
      document.body.removeChild(elem);
    };

    let modalContentElem = document.createElement('div');
    modalContentElem.className = 'modal-content';
    modalContentElem.onclick = function (event: any) {
      event.stopPropagation();
    };
    elem.appendChild(modalContentElem);

    modalContentElem.appendChild(this.makeHeaderElem(elem, options.title));

    let contentElem = document.createElement('div');
    contentElem.className = 'modal-body';
    modalContentElem.appendChild(contentElem);

    let bodyElem = document.createElement('div');
    contentElem.appendChild(bodyElem);

    if (options.label) {
      let labelElem = document.createElement('div');
      labelElem.className = 'mb10';
      labelElem.innerHTML = options.label;
      bodyElem.appendChild(labelElem);
    }

    inputElem = document.createElement('input');
    inputElem.className = 'input full';
    if (options.text) inputElem.value = options.text;
    if (options.placeholder) inputElem.setAttribute('placeholder', options.placeholder);
    if (options.type) inputElem.setAttribute('type', options.type);
    inputElem.onclick = function (event: any) {
      event.stopPropagation();
    };
    let okCallback: any = function (event: any) {
      event.stopPropagation();
      if (options.required && !inputElem.value) return;

      document.body.removeChild(elem);
      if (options.callback) options.callback(inputElem.value);
    };
    inputElem.onkeyup = function (event: any) {
      let keyCode: any = event.which || event.keyCode;
      if (keyCode == 13) okCallback(event);
      else if (keyCode == 27) cancelCallback(event);
    };
    bodyElem.appendChild(inputElem);
    modalContentElem.appendChild(this.makeFooterElem(okCallback, cancelCallback, options));

    document.body.appendChild(elem);
    inputElem.focus();
  }
}

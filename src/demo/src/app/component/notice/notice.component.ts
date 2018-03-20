import { Component } from '@angular/core';
import { NoticeService } from '../../../../../lib/src/notice/notice.service';

@Component({
  selector: 'component-notice',
  templateUrl: 'notice.component.html'
})
export class ComponentNoticeComponent {
  constructor(private _noticeService: NoticeService) {}

  onTip(theme: string, timeout?: any) {
    this._noticeService.notice({ theme: theme, body: theme + '！', timeout: timeout || 3000 });
  }

  onDialog() {
    this._noticeService.dialog({
      title: '确认',
      theme: 'primary',
      body: '是否继续？',
      callback: (ret: boolean) => {
        this._noticeService.notice({ body: ret ? '您选择的是： 是！' : '您选择的是： 否！' });
      }
    });
  }

  onInput() {
    this._noticeService.input({
      title: '请输入一个文本',
      theme: 'primary',
      text: '初始值',
      placeholder: '请输入',
      required: true,
      type: 'text',
      callback: (ret: string) => {
        this._noticeService.notice({ body: '您输入的是： ' + ret });
      }
    });
  }
}

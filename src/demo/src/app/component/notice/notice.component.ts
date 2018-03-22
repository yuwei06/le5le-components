import { Component } from '@angular/core';
import { NoticeService } from 'le5le-components';

@Component({
  selector: 'component-notice',
  templateUrl: 'notice.component.html',
  providers: [],
  styleUrls: ['./notice.component.pcss']
})
export class ComponentNoticeComponent {
  constructor() {}

  onMsgDefault() {
    let _noticeService: NoticeService = new NoticeService();
    _noticeService.notice({ body: 'default!', timeout: 200000000 });
  }
  onMsgSuccess() {
    let _noticeService: NoticeService = new NoticeService();
    _noticeService.notice({ theme: 'success', body: 'success!', timeout: 200000000 });
  }
  onMsgWarning() {
    let _noticeService: NoticeService = new NoticeService();
    _noticeService.notice({ theme: 'warning', body: 'warning!', timeout: 200000000 });
  }
  onMsgError() {
    let _noticeService: NoticeService = new NoticeService();
    _noticeService.notice({ theme: 'error', body: 'error!', timeout: 200000000 });
  }
  onMsgDialog() {
    let _noticeService: NoticeService = new NoticeService();
    _noticeService.dialog({ title: '关于', body: '乐吾乐 - angular UI 组件库', noCancel: true });
  }
  onMsgInput() {
    let _noticeService: NoticeService = new NoticeService();
    _noticeService.input({
      title: '名称',
      label: 'hello',
      theme: 'default',
      text: '',
      placeholder: '请输入名称',
      required: true,
      type: 'text',
      callback: (ret: string) => {
        _noticeService.dialog({ title: '你刚才的输入', body: ret, noCancel: true });
      }
    });
  }
}

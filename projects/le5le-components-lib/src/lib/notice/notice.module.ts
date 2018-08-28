import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticeService } from './notice.service';

@NgModule({
  imports: [CommonModule],
  declarations: [NoticeService],
  exports: [NoticeService]
})
export class NoticeModule {}

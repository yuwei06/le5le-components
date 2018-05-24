import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ComponentComponent } from './component.component';
import { ComponentRoutingModule } from './component-routing.module';
import { ComponentAvatarComponent } from './avatar/avatar.component';
import { ComponentNoticeComponent } from './notice/notice.component';
import { ComponentXtermComponent } from './xterm/xterm.component';
import { ComponentCodeComponent } from './code/code.component';
import { ComponentRateComponent } from './rate/rate.component';

@NgModule({
  imports: [SharedModule, ComponentRoutingModule],
  declarations: [
    ComponentComponent,
    ComponentAvatarComponent,
    ComponentNoticeComponent,
    ComponentXtermComponent,
    ComponentCodeComponent,
    ComponentRateComponent
  ],
  providers: []
})
export class ComponentModule {}

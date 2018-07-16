import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComponentComponent } from './component.component';
import { ComponentAvatarComponent } from './avatar/avatar.component';
import { ComponentNoticeComponent } from './notice/notice.component';
import { ComponentXtermComponent } from './xterm/xterm.component';
import { ComponentCodeComponent } from './code/code.component';
import { ComponentRateComponent } from './rate/rate.component';
import { ComponentEchartsComponent } from './echarts/echarts.component';
import { ComponentSelectComponent } from './select/select.component';
import { ComponentSliderComponent } from './slider/slider.component';

const OperatingRoutes: Routes = [
  {
    path: '',
    component: ComponentComponent,
    children: [
      {
        path: 'avatar',
        component: ComponentAvatarComponent
      },
      {
        path: 'notice',
        component: ComponentNoticeComponent
      },
      {
        path: 'rate',
        component: ComponentRateComponent
      },
      {
        path: 'xterm',
        component: ComponentXtermComponent
      },
      {
        path: 'code',
        component: ComponentCodeComponent
      },
      {
        path: 'echarts',
        component: ComponentEchartsComponent
      },
      {
        path: 'select',
        component: ComponentSelectComponent
      },
      {
        path: 'slider',
        component: ComponentSliderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(OperatingRoutes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule {}

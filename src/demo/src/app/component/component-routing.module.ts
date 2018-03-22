import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComponentComponent } from './component.component';
import { ComponentAvatarComponent } from './avatar/avatar.component';
import { ComponentNoticeComponent } from './notice/notice.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(OperatingRoutes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule {}

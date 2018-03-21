import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComponentComponent } from './component.component';
import { ComponentAvatarComponent } from './avatar/avatar.component';

const OperatingRoutes: Routes = [
  {
    path: '',
    component: ComponentComponent,
    children: [{ path: 'avatar', component: ComponentAvatarComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(OperatingRoutes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule {}

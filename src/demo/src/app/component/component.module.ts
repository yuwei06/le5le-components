import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ComponentComponent } from './component.component';
import { ComponentRoutingModule } from './component-routing.module';
import { ComponentAvatarComponent } from './avatar/avatar.component';

@NgModule({
  imports: [SharedModule, ComponentRoutingModule],
  declarations: [ComponentComponent, ComponentAvatarComponent],
  providers: []
})
export class ComponentModule {}

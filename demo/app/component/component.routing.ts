import { ModuleWithProviders }  from '@angular/core';
import { RouterModule } from '@angular/router';

import {ComponentComponent} from "./component.component";
import {ComponentNoticeComponent} from "./notice/notice.component";

export const componentRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'component',
    component: ComponentComponent ,
    children: [
      { path: 'notice', component: ComponentNoticeComponent },
    ]
  },
]);

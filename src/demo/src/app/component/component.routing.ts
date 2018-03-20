import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComponentComponent } from './component.component';
import { ComponentNoticeComponent } from './notice/notice.component';
import { ComponentLazyLoadComponent } from './lazyLoad/lazyLoad.component';
import { ComponentEllipsisComponent } from './ellipsis/ellipsis.component';
import { ComponentSwitchComponent } from './switch/switch.component';
import { ComponentQrcodeComponent } from './qrcode/qrcode.component';
import { ComponentValidatorComponent } from './validator/validator.component';
import { ComponentFileUploadComponent } from './fileUpload/fileUpload.component';
import { ComponentEditorComponent } from './editor/editor.component';
import { ComponentBtnSavingComponent } from './btnSaving/btnSaving.component';
import { ComponentTouchFormComponent } from './touchForm/touchForm.component';
import { ComponentTimeComponent } from './time/time.component';

export const componentRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'component',
    component: ComponentComponent,
    children: [
      { path: 'notice', component: ComponentNoticeComponent },
      { path: 'lazyLoad', component: ComponentLazyLoadComponent },
      { path: 'ellipsis', component: ComponentEllipsisComponent },
      { path: 'switch', component: ComponentSwitchComponent },
      { path: 'qrcode', component: ComponentQrcodeComponent },
      { path: 'validator', component: ComponentValidatorComponent },
      { path: 'fileUpload', component: ComponentFileUploadComponent },
      { path: 'editor', component: ComponentEditorComponent },
      { path: 'btnSaving', component: ComponentBtnSavingComponent },
      { path: 'touchForm', component: ComponentTouchFormComponent },
      { path: 'time', component: ComponentTimeComponent }
    ]
  }
]);

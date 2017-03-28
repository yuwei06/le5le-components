# le5le-components  
le5le-components是le5le的公用angular组件。

使用教程，参考:  
<a href="https://le5le-com.github.io/le5le-components" target="_blank">le5le-components官网</a>
<a href="https://github.com/le5le-com/le5le-ng-start" target="_blank">le5le-ng-start</a>


组件有：  
+ 消息通知notice  
+ 图片延迟加载lazyLoad  
+ switch开关  
+ 二维码qrcode  
+ 表单校验validator  
+ 文件上传fileUpload  
+ 富文本编辑器editor   


+ 文字过长省略号显示ellipsis

#  使用
npm install le5le-components
### 1. 按需import  
```$xslt
import {
  ImageLazyLoad,
  EllipsisPipe,
  SwitchComponent,
  QRCodeComponent,
  PhoneValidator,
  PasswordValidator,
  PositiveIntegerValidator,
  SameValidator,
  EmailValidator,
  FileSelectDirective,
  FileUploadComponent,
  BtnSavingDirective,
  TouchFormDirective,
  EditorComponent,
  NoticeService 
} from "le5le-components";

@NgModule({
  imports:       [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ImageLazyLoad,
    EllipsisPipe,
    SwitchComponent,
    QRCodeComponent,
    PhoneValidator,
    PasswordValidator,
    PositiveIntegerValidator,
    SameValidator,
    EmailValidator,
    FileSelectDirective,
    FileUploadComponent,
    BtnSavingDirective,
    TouchFormDirective,
    EditorComponent,
  ],
  exports:       [
    CommonModule,
    FormsModule,
    ImageLazyLoad,
    EllipsisPipe,
    SwitchComponent,
    QRCodeComponent,
    PhoneValidator,
    PasswordValidator,
    PositiveIntegerValidator,
    SameValidator,
    EmailValidator,
    FileSelectDirective,
    FileUploadComponent,
    BtnSavingDirective,
    TouchFormDirective,
    EditorComponent,
  ],
  providers:     [ NoticeService ]
})
export class SharedModule {
}
```


### 2. 导入整个模块  
```$xslt
import { Le5leComponentsModule } from "le5le-components";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Le5leComponentsModule,
  ],
  declarations: [ ],
  exports: [
    CommonModule,
    FormsModule,
    Le5leComponentsModule,
  ],
  providers: [ ]
})
export class SharedModule {
}

```

## 目录结构  

--src 组件源码  
--demo 帮助文档源码  
--docs github网页



## 本地调试 
本地开发调试： npm start运行demo

## 编译  
生产环境中，需要用npm run build编译github的docs网站文件。




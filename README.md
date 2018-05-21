# le5le-components

le5le-components 是 le5le 的公用 angular 组件。

使用教程，参考:  
<a href="https://le5le-com.github.io/le5le-components" target="_blank">le5le-components 官网</a>
<a href="https://github.com/le5le-com/le5le-ng-start" target="_blank">le5le-ng-start</a>

组件有：

* 消息通知 notice
* 图片延迟加载 lazyLoad
* switch 开关
* 二维码 qrcode
* 表单校验 validator
* 文件上传 fileUpload
* 富文本编辑器 editor

- 文字过长省略号显示 ellipsis

# 使用

npm install le5le-components

### 2. 导入整个模块

```$xslt
import { Le5leComponentsModule } from 'le5le-components';

@NgModule({
  imports: [
    Le5leComponentsModule,
  ],
  exports: [
    Le5leComponentsModule,
  ]
})
export class SharedModule {
}
```

## 目录结构

--projects/lib 组件源码  
--src 帮助文档源码  
--docs github 网页

## 本地调试

npm start 运行 demo

## 编译

npm run build 编译 lib。

npm run docs 编译 github 的 docs 网站文件。

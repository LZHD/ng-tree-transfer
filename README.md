# ng-tree-transfer

angular tree-transfer based on ng-zorro-antd

[![NPM version](https://img.shields.io/npm/v/ng-tree-transfer.svg)](https://www.npmjs.com/package/ng-tree-transfer)

## Example

[Live Example](https://lzhd.github.io/ng-tree-transfer/)

## Usage

### 1. Install

```
npm install ng-tree-transfer --save
```

import { TreeTransferModule } from 'ng-tree-transfer';

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { TreeTransferModule } from 'ng-tree-transfer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    NgZorroAntdModule,
    TreeTransferModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 2. Template

```html
<nz-tree-transfer [source]="nodes"></nz-tree-transfer>
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| titles | 标题集合，顺序从左至右 | `string[]/TemplateRef<void>[]` | `['源数据','目的数据']` |
| source | 数据源，其中的数据将会被渲染到左侧框（Tree）中 | `Array` | `[]` |
| target | 显示在右侧框数据的key集合 | `string[]` | `[]` |
| showSearch | 是否显示搜索框 | `boolean` | `false` |
| footer | 底部渲染模板 | `string/TemplateRef<void>` | - |

## License

The MIT License (see the [LICENSE](https://github.com/lzhd/ng-tree-transfer/blob/master/LICENSE) file for the full text)

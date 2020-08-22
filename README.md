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
import { CommonModule } from '@angular/common';
import { TreeTransferModule } from 'ng-tree-transfer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    TreeTransferModule
  ],
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
| `[titles]` | 标题集合，顺序从左至右 | `string[]/TemplateRef<void>[]` | `['源数据','目的数据']` |
| `[source]` | 数据源，其中的数据将会被渲染到左侧框（Tree）中 | `NzTreeNodeOptions[]` | `[]` |
| `[target]` | 显示在右侧框数据的key集合 | `string[]` | `[]` |
| `[showSearch]` | 是否显示搜索框 | `boolean` | `false` |
| `[footer]` | 底部渲染模板，顺序从左至右 | `string[]/TemplateRef<void>[]` | - |
| `[treeExpandAll]` | 是否展开左侧树所有节点 | `boolean` | `false`
| `[nzSearchPlaceholder]` | 搜索框的默认值 | `string` | `'请输入要搜索的内容'`
| `(nzChange)` | 选项在两栏之间转移时的回调函数 | `EventEmitter<object>` | - |
| `(nzSearchChange)` | 搜索框内容时改变时的回调函数 | `EventEmitter<object>` | - |

## License

The MIT License (see the [LICENSE](https://github.com/lzhd/ng-tree-transfer/blob/master/LICENSE) file for the full text)

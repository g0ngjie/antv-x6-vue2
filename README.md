# antv-x6-vue2

@antv/x6 基于 vue2 的图形化流程

[在线访问](https://g0ngjie.github.io/alrale-laboratory/materials/x6/#/)

- [ ] ~~国际化~~
- [x] 画布自适应
- [x] 快捷键
- [x] 工具栏 组合按键功能
- [ ] 定制化
  - [ ] 工具栏
  - [x] Tooltips
  - [x] 操作区域

### 使用

> main.js

```js
import Vue from "vue";
import antv from "antv-x6-vue2";
import "antv-x6-vue2/lib/antv.css";

Vue.use(antv);
```

> vue2 文件中使用

```vue
<template>
  <div>
    <antv-x6-vue2></antv-x6-vue2>
  </div>
</template>
```

#### Api

| 说明                 | 函数                                                                                   |
| :------------------- | -------------------------------------------------------------------------------------- |
| 初始化画布默认数据   | initDefaultData(nodes: any[], edges: any[]): void                                      |
| 获取数据             | exportData(): { nodes: string[], edges: string[], nodesJSON: any[], edgesJSON: any[] } |
| 画布只读             | onlyLook(bool: boolean): void                                                          |
| 修改 Node 节点文案   | updateLabel(label: string): void                                                       |
| 监听单元事件双击回调 | GraphListener.doubleNodeClick(cb: ICallbackFunc): void                                 |
| 监听单元事件单击回调 | GraphListener.nodeClick(cb: ICallbackFunc): void                                       |
| 图形校验函数         | graphValidate(): { ok: boolean, errs: string[] }                                       |

> 使用方式

```js
import { graphFunc } from "antv-x6-vue2";

graphFunc.GraphListener.doubleNodeClick((detail) => {
  const { nodeId, label, actionType } = detail;
});
```

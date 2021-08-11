import { Shape } from "@antv/x6"
import { ActionType } from "../common/enums";
// 开始节点
export default class BeginNode extends Shape.Rect {

}

BeginNode.config({
  width: 50,
  height: 50,
  zIndex: 100,
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'text',
      selector: 'label',
    }
  ],
  data: {
    initialization: true,
    actionType: ActionType.CONDITION
  },
  attrs: {
    label: {
      text: '状态条件',
      fill: "#fff",
      strokeWidth: 0.4,
      fontSize: 12,
    },
    body: {
      transform: "rotate(-45,25,25)",
      stroke: "#5b8ffa",
      strokeWidth: 1,
      fill: "#9ec9ff",
      rx: 5, // 属性用于定义水平轴向的圆角半径尺寸。
      ry: 5,
    }
  },
  ports: {
    items: [
      { group: 'in', id: 'p_top' },
      { group: 'out', id: 'p_bottom' },
    ],
    groups: {
      in: {
        attrs: {
          circle: {
            dataClass: 'choice-point',
            r: 6,
            magnet: true,
            stroke: '#5b8ffa',
            strokeWidth: 1,
            fill: '#fff',
            // 上平移
            transform: 'translate(0, -7)'
          }
        },
        position: 'top'
      },
      out: {
        attrs: {
          circle: {
            dataClass: 'choice-point',
            r: 6,
            magnet: true,
            stroke: '#5b8ffa',
            strokeWidth: 1,
            fill: '#fff',
            // 下平移
            transform: 'translate(0, 7)'
          }
        },
        position: 'bottom'
      }
    }
  },
})

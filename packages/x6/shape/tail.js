
import { Shape } from "@antv/x6"
export default class GeneralNode extends Shape.Rect {

}
GeneralNode.config({
  width: 100,
  height: 50,
  zIndex: 100,
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'text',
      selector: 'label',
    }
  ],
  attrs: {
    label: {
      text: '执行动作',
      fill: "#fff",
      strokeWidth: 0.4,
      fontSize: 12,
    },
    body: {
      stroke: "#5b8ffa",
      strokeWidth: 1,
      fill: "#9ec9ff",
      rx: 5,
      ry: 5
    }
  },
  ports: {
    items: [
      { group: 'port-top', id: 'p_top' },
      { group: 'port-bottom', id: 'p_bottom' },
    ],
    groups: {
      "port-top": {
        position: 'top',
        zIndex: 20,
        attrs: {
          circle: {
            dataClass: 'choice-point',
            r: 6,
            magnet: true,
            stroke: '#5b8ffa',
            strokeWidth: 1,
            fill: '#fff'
          }
        }
      },
      "port-bottom": {
        position: 'bottom',
        zIndex: 20,
        attrs: {
          circle: {
            dataClass: 'choice-point',
            r: 6,
            magnet: true,
            stroke: '#5b8ffa',
            strokeWidth: 1,
            fill: '#fff'
          }
        }
      }
    }
  },
})


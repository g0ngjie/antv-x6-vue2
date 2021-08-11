import { Shape, Color } from "@antv/x6"
// 开始节点
export default class BeginNode extends Shape.Ellipse {

}

BeginNode.config({
  width: 100,
  height: 50,
  zIndex: 100,
  markup: [
    {
      tagName: 'ellipse',
      selector: 'body'
    },
    {
      tagName: 'text',
      selector: 'label',
    }
  ],
  data: {
    initialization: true
  },
  attrs: {
    label: {
      text: '普通节点',
      fill: "#fff",
      strokeWidth: 0.4,
      fontSize: 12,
    },
    body: {
      stroke: "#5b8ffa",
      strokeWidth: 1,
      fill: Color.lighten('#5b8ffa', 36),
    }
  },
  ports: {
    items: [
      { group: 'port_g', id: 'p_bottom' },
    ],
    groups: {
      port_g: {
        attrs: {
          circle: {
            dataClass: 'choice-point',
            r: 6,
            magnet: true,
            stroke: '#5b8ffa',
            strokeWidth: 1,
            fill: '#fff'
          },
        },
        position: 'bottom'
      }
    }
  },
})

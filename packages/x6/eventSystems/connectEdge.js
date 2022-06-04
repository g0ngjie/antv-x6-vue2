import { Vector } from "@antv/x6";

export default (graph) => {
  graph.on('edge:connected', (args) => {
    const edge = args.edge;
    const node = args.currentCell;
    const elem = args.currentMagnet;
    const portId = elem.getAttribute('port');

    if (node.isNode() && node.shape === 'vue-shape') {
      const view = graph.findViewByCell(edge)
      if (view) {
        const path = view.findOne('path')
        if (path) {
          const token = Vector.create('circle', {
            r: 5,
            fill: '#5F95FF',
          })
          token.animateAlongPath(
            {
              dur: '3s',
              repeatCount: 'indefinite',
            },
            path,
          )
          token.appendTo(path.parentNode)
        }
      }
    }
    if (node.shape === 'vue-shape') return

    // 触发 port 重新渲染
    node.setPortProp(portId, 'connected', true);
    edge.zIndex = -1;
    // 更新连线样式
    edge.attr({
      line: {
        strokeDasharray: '',
        targetMarker: 'classic'
      }
    });
    edge.appendLabel({
      attrs: {
        label: {
          text: ""
        }
      }
    });
  });
}

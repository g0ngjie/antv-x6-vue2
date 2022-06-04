import { Channel } from "../common/transmit";
import { CustomEventTypeEnum, SelectStateEnum, ToolTypeEnum } from "../common/enums";

export default (graph) => {

  graph.on('cell:selected', ({ cell }) => {
    let removeBtnCfg;
    if (cell.isEdge()) {
      cell.attr('line', { stroke: 'skyblue', strokeWidth: 3 });
      removeBtnCfg = { distance: '30%' };
    }

    if (cell.isNode()) {
      const cellView = graph.findView(cell);
      cellView.addClass(`${cell.shape}-selected`);
      // 删除图标偏移量 { x: 0, y: 0, offset: { x: -5, y: -5 } }
      // https://x6.antv.vision/zh/docs/api/registry/node-tool#button-remove
      removeBtnCfg = { x: -28, y: -5 }
    }
    Channel.dispatchEvent(CustomEventTypeEnum.CELL_CLICK, SelectStateEnum.SELECTED)

    // 多单选选中时，移除删除
    const cells = graph.getSelectedCells();
    if (cells.length > 1) {
      cells.forEach(currentCell => {
        currentCell.removeTools()
      });
    } else {
      // x6默认提供 button-remove, icon比较小, 交互体验不友好
      // cell.addTools({
      //   name: 'button-remove', // 工具名称
      //   args: removeBtnCfg // 工具对应的参数
      // });
      cell.addTools({
        name: ToolTypeEnum.REMOVE_BUTTON, // 工具名称
        args: removeBtnCfg // 工具对应的参数
      });
    }
  });

  graph.on('cell:unselected', ({ cell }) => {
    if (cell.isEdge()) {
      cell.attr('line', { stroke: '#7c68fc', strokeWidth: 2 });
    } else {
      const cellView = graph.findView(cell);
      cellView && cellView.removeClass(`${cell.shape}-selected`);
    }
    cell.removeTools()

    Channel.dispatchEvent(CustomEventTypeEnum.CELL_CLICK, SelectStateEnum.UN_SELECTED)
    // 取消 tooltip
    graph.getNodes()?.forEach(node => {
      if (node.shape === 'html') graph.removeNode(node)
    })
  });
}

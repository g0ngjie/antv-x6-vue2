import { Channel } from "./transmit";
import { CustomEventTypeEnum } from "./enums";
// 可操作事件

export default (graph) => {
    bindKey(graph)
}

const State = {
    offset: 30,
    useLocalStorage: true
}

// https://x6.antv.vision/zh/docs/api/graph/keyboard/#bindkey
function bindKey(graph) {
    // 复制
    graph.bindKey(['ctrl+c', 'command+c'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
            graph.copy(cells)
        }
        // 判断一个键盘事件是否应该被处理，返回 false 时对应的键盘事件被忽略。
        return false
    })
    // 粘贴
    graph.bindKey(['ctrl+v', 'command+v'], () => {
        if (!graph.isClipboardEmpty()) {
            const cells = graph.paste({ offset: 32 })
            graph.cleanSelection()
            graph.select(cells)
        }
        return false
    })
    // 全选
    graph.bindKey(['ctrl+a', 'command+a'], () => {
        const cells = graph.getCells();
        if (cells.length) {
            graph.select(cells);
        }
        return false
    })
    // 删除
    graph.bindKey(['delete', 'backspace'], () => {
        const cells = graph.getSelectedCells();
        if (cells.length) {
            // 删除前移除所有包含工具
            cells.forEach(currentCell => {
                currentCell.removeTools()
            });
            graph.removeCells(cells);
        }
        return false
    }, 'keydown')
    // 撤销
    graph.bindKey(['ctrl+z', 'command+z'], () => {
        graph?.history?.undo();
        return false
    })
    // 重做
    graph.bindKey(['ctrl+y', 'shift+command+z'], () => {
        graph?.history?.redo();
        return false
    })
    // Esc 取消所有选中单元 & 关闭提示
    graph.bindKey('esc', () => {
        graph.cleanSelection()
        Channel.dispatchEvent(CustomEventTypeEnum.HELP, 'close')
        return false
    })
    // help
    graph.bindKey(['alt+h', 'option+h'], () => {
        Channel.dispatchEvent(CustomEventTypeEnum.HELP)
        return false
    })
    // 居中
    graph.bindKey(['alt+f', 'option+f'], () => {
        graph.centerContent();
        return false
    })
}

// 粘贴
export function onPaste(graph) {
    const cells = graph?.getSelectedCells()
    if (cells && cells.length) {
        graph.copy(cells, State)
    }
    if (!graph.isClipboardEmpty()) {
        const cells = graph.paste(State)
        graph.cleanSelection()
        graph.select(cells)
    }
}

export function deleteCells(graph) {
    const cells = graph.getSelectedCells();
    if (cells.length) {
        // 删除前移除所有包含工具
        cells.forEach(currentCell => {
            currentCell.removeTools()
        });
        graph.removeCells(cells);
    }
}

// 全选
export function selectAll(graph) {
    const cells = graph.getCells();
    if (cells.length) {
        graph.select(cells);
    }
}

/**
 * 冻结画布
 */
export function freezeGraph(graph) {
    const cells = graph.getCells();
    if (cells.length) {
        cells.forEach(cell => {
            cell.removeTools()
            cell.setData({ disableMove: true })
        });
    }
    // 移除连接桩子会导致 边 移除
    // const nodes = graph.getNodes()
    // for (const node of nodes) {
    //     // 禁用所有连接桩
    //     node.removePorts()
    // }
    graph.freeze()
        // 单选框
        .disableSelection()
        // 多选框
        .disableMultipleSelection()
        // 清空选区
        .cleanSelection()
        // 剪切板
        .disableClipboard()
        // 历史记录
        .disableHistory()
        // 对齐线
        .disableSnapline()
        // 快捷键
        .disableKeyboard()
    Channel.dispatchEvent(CustomEventTypeEnum.FREEZE_GRAPH, true);
}

/**
 * 解冻
 */
export function unfreezeGraph(graph) {
    const cells = graph.getCells();
    if (cells.length) {
        cells.forEach(cell => {
            cell.setData({ disableMove: false })
        });
    }
    graph.unfreeze()
        .enableSelection()
        .enableMultipleSelection()
        .enableClipboard()
        .enableHistory()
        .enableSnapline()
        .enableKeyboard()
    Channel.dispatchEvent(CustomEventTypeEnum.FREEZE_GRAPH, false);
}
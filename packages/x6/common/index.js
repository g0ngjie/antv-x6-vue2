import { Lang } from "@antv/x6";
import { CustomEventTypeEnum, StoreKey } from "./enums";
import { fromJSON, toJSON } from "./transform";
import { Channel } from "./transmit";
import { freezeGraph, unfreezeGraph } from "./trigger";

/**json格式化 */
export function fmtJSON(target) {
    try {
        if (Lang.isString(target)) return JSON.parse(target)
        if (Lang.isArray(target)) return target.map((item) => JSON.parse(item))
        else if (Lang.isObject(target)) return target
        else throw new TypeError('nodes or edges error')
    } catch (error) {
        return {}
    }
}

/**文字溢出格式化 */
export function fmtLabelOverflow(label) {
    if (!Lang.isString(label)) return label
    if (label.length <= 8) return label
    const cutLabel = label.slice(0, 6) + '...'
    return cutLabel
}

function getStore(key) {
    return window[key]
}

/**缓存 */
function linkedPointByStore(key, target) {
    window[key] = target
}

/**画布节点链接 */
export function linkedGraph(graph) {
    linkedPointByStore(StoreKey.GRAPH, graph)
}

/**获取画布数据 */
export function getGraphJSON() {
    const graph = getStore(StoreKey.GRAPH)
    return toJSON(graph)
}

/**初始化画布默认数据 */
export function setDefaultGraphData(nodes, edges) {
    const graph = getStore(StoreKey.GRAPH)
    fromJSON(graph, nodes, edges)
}

/**冻结画布 */
export function disableGraph(bool) {
    const graph = getStore(StoreKey.GRAPH)
    if (bool) freezeGraph(graph)
    else unfreezeGraph(graph)
}

/**监听单元事件双击回调 */
export function nodeDclick(cb) {
    Channel.eventListener(CustomEventTypeEnum.DOUBLE_NODE_CLICK, (detail) => {
        cb(detail)
    });
}

/**监听单元事件单击回调 */
export function nodeClick(cb) {
    Channel.eventListener(CustomEventTypeEnum.NODE_CLICK, (detail) => {
        cb(detail)
    });
}

/**修改Node节点文案 */
export function updateNodeLabel(label) {
    const graph = getStore(StoreKey.GRAPH)
    const cells = graph.getSelectedCells()
    if (Lang.isArray(cells) && cells.length === 1) {
        const cell = cells[0]
        cell.data.tooltip = label
        const cutLabel = fmtLabelOverflow(label)
        const currentLabel = cell.attrs.label
        cell.updateAttrs({
            label: {
                ...currentLabel,
                text: cutLabel
            }
        }, { deep: false })
    }
}